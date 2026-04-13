import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_TO = 'kashishlifescience@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in your name, email, and message.' },
        { status: 400 }
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL_TO || DEFAULT_TO;
    const subj = subject || 'Website contact';

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const from = process.env.RESEND_FROM || 'Kashish Life Science <onboarding@resend.dev>';
      const text = `From: ${name} <${email}>\nSubject: ${subj}\n\n${message}`;
      const html = `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(subj)}</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `[Contact] ${subj}`,
          text,
          html,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('[contact] Resend error:', res.status, errText);
        return NextResponse.json(
          { error: 'Could not send your message right now. Please try email or phone.' },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, sent: true });
    }

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(`[Contact] ${subj}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    return NextResponse.json({ ok: true, fallback: true, mailto });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export type CustomerProfile = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
};

const PROFILE_KEY_PREFIX = 'kashish-life-profile:';

function getStorageKey(userId: string) {
  return `${PROFILE_KEY_PREFIX}${userId}`;
}

export function loadCustomerProfile(userId: string): CustomerProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(getStorageKey(userId));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as CustomerProfile;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCustomerProfile(userId: string, profile: CustomerProfile) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(profile));
}

export function validateCustomerProfile(profile: CustomerProfile | null): string[] {
  if (!profile) return ['Profile details not found'];

  const missing: string[] = [];
  if (!profile.fullName?.trim()) missing.push('Full name');
  if (!profile.phone?.trim()) missing.push('Phone number');
  if (!profile.addressLine1?.trim()) missing.push('Address line 1');
  if (!profile.city?.trim()) missing.push('City');
  if (!profile.state?.trim()) missing.push('State');
  if (!profile.pincode?.trim()) missing.push('Pincode');
  return missing;
}

/**
 * Turns the way Australians write numbers (0416 595 902, 61416595902,
 * +61 416 595 902) into E.164. Anything already in + form is left alone.
 * Returns '' when the value cannot be a phone number.
 */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 8 || digits.length > 15) {
    return '';
  }

  if (hasPlus) {
    return `+${digits}`;
  }

  if (digits.startsWith('61') && digits.length === 11) {
    return `+${digits}`;
  }

  if (digits.startsWith('0') && digits.length === 10) {
    return `+61${digits.slice(1)}`;
  }

  // Mobile typed without the leading zero, e.g. 416595902.
  if (digits.startsWith('4') && digits.length === 9) {
    return `+61${digits}`;
  }

  return `+${digits}`;
}

export function validateDocument(document: string): boolean {
  const cleaned = document.replace(/[^\d]+/g, '');

  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) {
    return false;
  }

  const checkDigitDocument = (digits: string, factor: number): number => {
    let total = 0;
    for (const digit of digits) {
      total += parseInt(digit, 10) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstNine = cleaned.substring(0, 9);
  const firstCheck = checkDigitDocument(firstNine, 10);
  const secondCheck = checkDigitDocument(firstNine + firstCheck, 11);

  return (
    parseInt(cleaned[9], 10) === firstCheck &&
    parseInt(cleaned[10], 10) === secondCheck
  );
}

export function cleanDocument(document: string): string {
  return document.replace(/[^\d]+/g, '');
}

export const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
export const isNotEmpty = (value) => value?.trim() !== "";
export const isValidPhone = (value) =>
  /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/.test(value);

const stringRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s\W]+$/;

export default function validateString(string) {
  return stringRegex.test(string);
}

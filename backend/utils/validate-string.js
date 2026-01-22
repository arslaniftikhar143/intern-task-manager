function validateString(title) {
  const regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s\W]+$/;
  return regex.test(title);
}

module.exports = { validateString };

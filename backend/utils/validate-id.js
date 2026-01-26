function isIdValid(id) {
  const idRegex = /^[a-fA-F0-9]{24}$/;
  return idRegex.test(id);
}

module.exports = { isIdValid };

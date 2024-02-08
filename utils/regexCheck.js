const regexCheck = (string, regex) =>
  !string || !string.trim().length || regex.test(string);

module.exports = { regexCheck };

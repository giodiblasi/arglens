const { parsingSuccess, parsingError } = require('./parseResult');

const stringParser =
  stringValue => parsingSuccess(stringValue);

const intParser = (stringValue) => {
  const intValue = Number(stringValue, 10);
  if (!Number.isNaN(intValue)) return parsingSuccess(intValue);
  return parsingError();
};

const configureParsers = (extensions = []) => {
  let parsers = [];
  parsers.push({ type: 'string', parse: stringParser });
  parsers.push({ type: 'int', parse: intParser });
  parsers = parsers.concat(extensions);
  return parsers;
};

module.exports = {
  configureParsers,
};

const { parsingSuccess, parsingError } = require('./parseResult');

const passthroughParser =
  stringValue => parsingSuccess(stringValue);

const intParser = (stringValue) => {
  const intValue = Number(stringValue, 10);
  if (!Number.isNaN(intValue)) return parsingSuccess(intValue);
  return parsingError();
};

const configureParsers = (extensions = []) => {
  let parsers = [];
  parsers.push({ type: 'string', parse: passthroughParser });
  parsers.push({ type: 'int', parse: intParser });
  parsers.push({ type: 'option', parse: passthroughParser });
  parsers = parsers.concat(extensions);
  return parsers;
};

module.exports = {
  configureParsers,
};

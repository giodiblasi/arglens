const { parsingSuccess } = require('./parseResult');

const stringParser =
  stringValue => parsingSuccess(stringValue);


const configureParsers = (extensions = []) => {
  const parsers = [];
  parsers.push({ type: 'string', parse: stringParser });
  parsers.push(extensions);
  return parsers;
};

module.exports = {
  configureParsers,
};

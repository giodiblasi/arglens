const { parsingSuccess, parsingError } = require('./parseResult');
const eitherFind = require('./safeFind');
const ERRORS = require('./errors');

const passthroughParser =
  stringValue => parsingSuccess(stringValue);

const intParser = (stringValue, argType) => {
  const intValue = Number(stringValue, 10);
  if (!Number.isNaN(intValue)) return parsingSuccess(intValue);
  return parsingError(ERRORS.parsingError(stringValue, argType));
};

const configureParsers = (extensions = []) => {
  let parsers = [];
  parsers.push({ type: 'string', parse: passthroughParser });
  parsers.push({ type: 'int', parse: intParser });
  parsers.push({ type: 'option', parse: passthroughParser });
  parsers = parsers.concat(extensions);
  return {
    parse: (argType, rawValue) =>
      eitherFind(() => parsers.find(p => p.type === argType), p => p !== undefined)
        .either(
          () => parsingError(ERRORS.typeNotFound(argType)),
          parser => parser.parse(rawValue, argType)
        ),
  };
};

module.exports = {
  configureParsers,
};

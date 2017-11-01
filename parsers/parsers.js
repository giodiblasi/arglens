const { parsingSuccess, parsingError } = require('./parseResult');
const eitherFind = require('../utils/eitherFind');
const ERRORS = require('../utils/errors');
const types = require('./parserTypes');

const passthroughParser =
  stringValue => parsingSuccess(stringValue);

const intParser = (stringValue, argType) => {
  const intValue = Number(stringValue, 10);
  if (!Number.isNaN(intValue)) return parsingSuccess(intValue);
  return parsingError(ERRORS.parsingError(stringValue, argType));
};

const getParser = (extensions = []) => {
  let parsers = [];
  parsers.push({ type: types.STRING, parse: passthroughParser });
  parsers.push({ type: types.INTEGER, parse: intParser });
  parsers.push({ type: types.OPTION, parse: passthroughParser });
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
  getParser,
};

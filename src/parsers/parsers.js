const { parsingSuccess, parsingError } = require('./parseResult');
const eitherFind = require('../utils/eitherFind');
const ERRORS = require('../utils/errors');
const types = require('./parserTypes');

const passthroughParser =
  stringValue => parsingSuccess(stringValue);

const intParser = (stringValue) => {
  const intValue = Number(stringValue, 10);
  return Number.isNaN(intValue) ?
    parsingError(ERRORS.parsingError(stringValue, types.INTEGER)) :
    parsingSuccess(intValue);
};

const dateParser = (stringValue, argType) => {
  const dateValue = new Date(stringValue);
  return Number.isNaN(dateValue.getDate()) ?
    parsingError(ERRORS.parsingError(stringValue, types.DATE)) :
    parsingSuccess(dateValue);
};

const getParser = (extensions) => {
  let parsers = [];
  parsers.push({ type: types.STRING, parse: passthroughParser });
  parsers.push({ type: types.INTEGER, parse: intParser });
  parsers.push({ type: types.OPTION, parse: passthroughParser });
  parsers.push({ type: types.DATE, parse: dateParser });
  parsers = parsers.concat(extensions);
  return {
    parse: (argType, rawValue) =>
      eitherFind(() => parsers.find(p => p.type === argType), p => p !== undefined)
        .either(
          () => parsingError(ERRORS.typeNotFound(argType)),
          parser => parser.parse(rawValue)
        ),
  };
};

module.exports = {
  getParser,
};

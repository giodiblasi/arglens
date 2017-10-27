const { configureParsers } = require('./parsers');
const { argumentInfo, normalize } = require('./argumentInfo');
const ERRORS = require('./errors');

const argBuilder = parsers => (argName, argValue, argType) => {
  const arg = argumentInfo(argName, argValue);
  const parser = parsers.find(p => p.type === argType);
  if (!parser) {
    return arg.notValid(ERRORS.typeNotFound(argType));
  }
  return parser.parse(arg.rawValue)
    .either(
      () => arg.notValid(ERRORS.parsingError(arg.rawValue, argType)),
      value => arg.valid(value)
    );
};

const findArgByName = (inputArgs, argName, prefix) => {
  const index = inputArgs.findIndex(arg => arg === `${prefix}${argName}`);
  return {
    index,
    either: (onFail, onSuccess) => {
      if (index !== -1) return onSuccess(index);
      return onFail();
    },
  };
};


const extractValue = build => (configuredArgs, inputArgs) => {
  const argItems = [];
  configuredArgs.forEach((configuredArg) => {
    let argValue = {};
    if (configuredArg.type === 'option') {
      argValue = findArgByName(inputArgs, configuredArg.name, '--')
        .either(() => configuredArg.default, () => !configuredArg.default);
    } else {
      argValue = findArgByName(inputArgs, configuredArg.name, '-')
        .either(() => configuredArg.default.toString(), argIndex => inputArgs[argIndex + 1]);
    }
    const argItem = build(configuredArg.name, argValue, configuredArg.type);
    argItems.push(argItem);
  });

  return argItems;
};

const arglens = (inputArgs, configurations, parserExtensions = []) => {
  const builder = argBuilder(configureParsers(parserExtensions));
  const parsedArgs = extractValue(builder)(configurations.arguments, inputArgs);
  return normalize(parsedArgs);
};

module.exports = arglens;

const { getParser } = require('./parsers');
const { OPTION } = require('./parserTypes');
const { argumentInfo, flat } = require('./argumentInfo');
const eitherFind = require('./safeFind');

const argumentFactory = parsers => (argName, argValue, argType) => {
  const arg = argumentInfo(argName, argValue);
  return parsers.parse(argType, argValue)
    .either(
      error => arg.notValid(error),
      value => arg.valid(value)
    );
};


const findArgByName = (inputArgs, argName, prefix) =>
  eitherFind(
    () => inputArgs.findIndex(arg => arg === `${prefix}${argName}`),
    index => index !== -1
  );


const processArguments = (configuredArgs, inputArgs, createArg) => {
  const argItems = [];
  configuredArgs.forEach((configuredArg) => {
    let argValue = {};
    if (configuredArg.type === OPTION) {
      argValue = findArgByName(inputArgs, configuredArg.name, '--')
        .either(() => configuredArg.default, () => !configuredArg.default);
    } else {
      argValue = findArgByName(inputArgs, configuredArg.name, '-')
        .either(() => configuredArg.default.toString(), argIndex => inputArgs[argIndex + 1]);
    }
    const argItem = createArg(configuredArg.name, argValue, configuredArg.type);
    argItems.push(argItem);
  });

  return argItems;
};

const arglens = (inputArgs, configurations, parserExtensions = []) => {
  const createArg = argumentFactory(getParser(parserExtensions));
  const parsedArgs = processArguments(configurations.arguments, inputArgs, createArg);
  return flat(parsedArgs);
};

module.exports = arglens;

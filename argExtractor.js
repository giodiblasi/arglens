const { configureParsers } = require('./parsers');
const { argumentInfo, normalize } = require('./argumentInfo');
const eitherFind = require('./safeFind');

const argBuilder = parsers => (argName, argValue, argType) => {
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
    index => index !== -1,
  );


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

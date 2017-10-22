/* eslint no-param-reassign: ["error", { "props": false }] */
const { configureParsers } = require('./parsers');
const { argumentInfo } = require('./argumentInfo');
const ERRORS = require('./errors');

const argBuilder = (argConfigurations, parsers) => (argName, argValue) => {
  const arg = argumentInfo(argName, argValue);
  const argConfig = argConfigurations.find(argConfiguration => argConfiguration.name === argName);
  if (argConfig) {
    const parser = parsers.find(p => p.type === argConfig.type);
    if (!parser) {
      return arg.notValid(ERRORS.typeNotFound(argConfig.type));
    }
    return parser.parse(arg.rawValue)(
      () => arg.notValid(ERRORS.parsingError(arg.rawValue, argConfig.type)),
      value => arg.valid(value),
    );
  }
  return arg.notValid(ERRORS.argumentsNotFound(arg));
};

const extractValue = (build) => {
  const extract = (inputArgs, argItems = {}) => {
    const index = inputArgs.findIndex(arg => arg[0] === '-');
    if (index === -1) {
      return argItems;
    }
    const argName = inputArgs[index][1];
    const argValue = inputArgs[index + 1];
    const arg = build(argName, argValue);
    const newArgItems = Object.assign(arg.extract(), argItems);
    return extract(inputArgs.slice(index + 1), newArgItems);
  };
  return extract;
};

const arglens = (inputArgs, configurations) => {
  const builder = argBuilder(configurations.arguments, configureParsers());
  return extractValue(builder)(inputArgs);
};

module.exports = arglens;

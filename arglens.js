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
      value => arg.valid(value)
    );
  }
  return arg.notValid(ERRORS.argumentsNotFound(arg));
};

const argBuilder1 = parsers => (argName, argValue, argType) => {
  const arg = argumentInfo(argName, argValue);
  const parser = parsers.find(p => p.type === argType);
  if (!parser) {
    return arg.notValid(ERRORS.typeNotFound(argType));
  }
  return parser.parse(arg.rawValue)(
    () => arg.notValid(ERRORS.parsingError(arg.rawValue, argType)),
    value => arg.valid(value)
  );
};

const extractValue1 = build => (configuredArgs, inputArgs) => {
  let argItems = {};
  configuredArgs.forEach((configuredArg) => {
    const argIndex = inputArgs.findIndex(arg => arg === `-${configuredArg.name}`);
    const argValue = (argIndex !== -1) ? inputArgs[argIndex + 1] : configuredArg.default.toString();
    const arg = build(configuredArg.name, argValue, configuredArg.type);
    argItems = Object.assign(arg.extract(), argItems);
  });

  return argItems;
};

const extractValue = (build) => {
  const extract = (inputArgs, argItems = {}) => {
    const index = inputArgs.findIndex(arg => arg[0] === '-');
    if (index === -1) {
      return argItems;
    }
    const argName = inputArgs[index].substring(1);
    const argValue = inputArgs[index + 1];
    const arg = build(argName, argValue);
    const newArgItems = Object.assign(arg.extract(), argItems);
    return extract(inputArgs.slice(index + 1), newArgItems);
  };
  return extract;
};

const arglens = (inputArgs, configurations, parserExtensions = []) => {
  const builder = argBuilder1(configureParsers(parserExtensions));
  return extractValue1(builder)(configurations.arguments, inputArgs);
};

module.exports = arglens;

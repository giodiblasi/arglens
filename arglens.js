/* eslint no-param-reassign: ["error", { "props": false }] */
const { configureParsers } = require('./parsers');
const { argumentInfo } = require('./argumentInfo');
const ERRORS = require('./errors');

const argBuilder = parsers => (argName, argValue, argType) => {
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

const extractValue = build => (configuredArgs, inputArgs) => {
  let argItems = {};
  configuredArgs.forEach((configuredArg) => {
    const argIndex = inputArgs.findIndex(arg => arg === `-${configuredArg.name}`);
    const argValue = (argIndex !== -1) ? inputArgs[argIndex + 1] : configuredArg.default.toString();
    const arg = build(configuredArg.name, argValue, configuredArg.type);
    argItems = Object.assign(arg.extract(), argItems);
  });

  return argItems;
};

const arglens = (inputArgs, configurations, parserExtensions = []) => {
  const builder = argBuilder(configureParsers(parserExtensions));
  return extractValue(builder)(configurations.arguments, inputArgs);
};

module.exports = arglens;

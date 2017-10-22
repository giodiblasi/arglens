/* eslint no-param-reassign: ["error", { "props": false }] */

const ERRORS = {
  argumentsNotFound: arg => `argument ${arg.name} not found in configuration`,
  parsingError: 'unable to parse error',
  typeNotFound: type => `no parser found for type ${type}`,
};

const parsingError = () => error => error();

const parsingSuccess = value => (err, success) => success(value);


const stringParser =
  stringValue => parsingSuccess(stringValue);

const configureParsers = (extensions = []) => {
  const parsers = [];
  parsers.push({ type: 'string', parse: stringParser });
  parsers.push(extensions);
  return parsers;
};

const argument = (argName, argValue) => {
  const arg = {
    name: argName,
    rawValue: argValue,
  };

  arg.extract = () => Object.assign({
    [arg.name]:
      {
        rawValue: arg.rawValue,
        value: arg.value,
        error: arg.error,
        errorMessage: arg.errorMessage,
      },
  }, {});

  arg.valid = (value) => {
    arg.value = value;
    return arg;
  };

  arg.notValid = (errorMessage) => {
    arg.error = true;
    arg.errorMessage = errorMessage;
    return arg;
  };
  return arg;
};


const argBuilder = (argConfigurations, parsers) => (argName, argValue) => {
  const arg = argument(argName, argValue);
  const argConfig = argConfigurations.find(argConfiguration => argConfiguration.name === argName);
  if (argConfig) {
    const parser = parsers.find(p => p.type === argConfig.type);
    if (!parser) {
      return arg.notValid(ERRORS.typeNotFound(argConfig.type));
    }
    return parser.parse(arg.rawValue)(
      () => arg.notValid(),
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

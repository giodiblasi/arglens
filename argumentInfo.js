const argumentInfo = (argName, argValue) => {
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

module.exports = { argumentInfo };

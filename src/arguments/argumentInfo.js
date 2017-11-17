const argumentInfo = (argName, argValue) => {
  const arg = {
    name: argName,
    rawValue: argValue,
  };

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

const flat = (parsedArgs) => {
  const flatArgs = parsedArgs.reduce((prev, current) => {
    const newAcc = Object.assign({}, prev);
    if (current.error) {
      newAcc.error = true;
      newAcc.errorMessages.push(current.errorMessage);
    }
    newAcc.arguments[current.name] = current.value;
    return newAcc;
  }, { error: false, errorMessages: [], arguments: {} });

  const flatResult = {
    onSuccess: (callback) => {
      if (!flatArgs.error) callback(flatArgs.arguments);
      return flatResult;
    },
    onError: (callback) => {
      if (flatArgs.error) callback(flatArgs.errorMessages);
      return flatResult;
    },

  };
  return flatResult;
};


module.exports = { argumentInfo, flat };

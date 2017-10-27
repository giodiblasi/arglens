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

const normalize = parsedArgs =>
  parsedArgs.reduce((prev, current) => {
    const newAcc = Object.assign({}, prev);
    if (current.error) {
      newAcc.error = true;
      newAcc.errorMessages.push(current.errorMessage);
    }
    newAcc[current.name] = current.value;
    return newAcc;
  }, { error: false, errorMessages: [] });


module.exports = { argumentInfo, normalize };

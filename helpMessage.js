const getHelpMessage = configurations =>
  configurations
    .reduce((prev, current) =>
      `${prev}${current.name}[${current.default}]: ${current.description}\n`, '\nArgument description:\n\n');
module.exports = { getHelpMessage };

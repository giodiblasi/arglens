module.exports = {
  argumentsNotFound: arg => `argument ${arg.name} not found in configuration`,
  parsingError: (rawValue, type) => `unable to parse ${rawValue} for type: ${type}`,
  typeNotFound: type => `no parser found for type ${type}`,
};

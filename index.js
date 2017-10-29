const argExtractor = require('./argProcessor');
const { getHelpMessage } = require('./helpMessage');

const arglens = () => {
  let config = {};
  let extension = [];
  return {
    useConfiguration: (configuration) => { config = configuration; },
    useExtensions: (parserExtensions) => { extension = parserExtensions; },
    parse: input =>
      argExtractor(input, config, extension),
    getHelpMessage: () => getHelpMessage(config.arguments),
  };
};

module.exports = arglens();

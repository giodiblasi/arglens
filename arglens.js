const argProcessor = require('./arguments/argProcessor');
const { getHelpMessage } = require('./utils/helpMessage');
const parserTypes = require('./parsers/parserTypes');

const arglens = () => {
  let config = {};
  let extension = [];
  return {
    parser: {
      useConfiguration: (configuration) => { config = configuration; },
      useExtensions: (parserExtensions) => { extension = parserExtensions; },
      parse: input =>
        argProcessor(input, config, extension),
      getHelpMessage: () => getHelpMessage(config.arguments),
    },
    argumentTypes: parserTypes,
  };
};

module.exports = arglens();

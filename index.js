const argExtractor = require('./argExtractor');
const { getHelpMessage } = require('./helpMessage');

const arglens = (configuration, parserExtension) => ({
  parse: input =>
    argExtractor(input, configuration, parserExtension),
  getHelpMessage: () => getHelpMessage(configuration.arguments),
});

module.exports = arglens;

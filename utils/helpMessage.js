const { OPTION } = require('../parsers/parserTypes');

const buildDefaultMessage = argConf =>
  ((argConf.default) ? `(default: ${argConf.default})` : '');


const buildArgName = argConf =>
  ((argConf.type === OPTION) ? `--${argConf.name}` : ` -${argConf.name}`);


const getHelpMessage = configurations =>
  configurations
    .reduce((prev, current) =>
      `${prev}${buildArgName(current)}:\t ${current.description} ${buildDefaultMessage(current)}\n`, '\nArguments description:\n\n');
module.exports = { getHelpMessage };

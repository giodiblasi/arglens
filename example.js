const arglens = require('./index');

const conf = {
  arguments: [{
    name: 'port',
    type: 'int',
    default: 234,
    description: 'port number',
  }, {
    name: 'flag',
    type: 'option',
    default: false,
    description: 'boolean flag',
  }],
};

const argParser = arglens(conf);

const args = argParser.parse(process.argv);
console.log(args);
const arglens = require('./arglens');

const conf = {
  arguments: [{
    name: 'port',
    type: 'int',
    default: 234,
    description: 'port number',
  }, {
    name: 'flag',
    type: 'option',
    default: 'false',
    description: 'boolean flag',
  }],
};

const args = arglens(process.argv, conf);



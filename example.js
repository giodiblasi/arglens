const arglens = require('./arglens');

const conf = {
  arguments: [{
    name: 'port',
    type: 'int',
    default: 234,
  }, {
    name: 'flag',
    type: 'option',
    default: 'true',
  }],
};

const args = arglens(process.argv, conf);
console.log(args);

const arglens = require('./arglens');

const conf = {
  arguments: [{
    name: 'port',
    type: 'int',
    default: 234,
  }],
};

const args = arglens(process.argv, conf);
console.log(args);

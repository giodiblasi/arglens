const arglens = require('./arglens');

const conf = {
  arguments: [{
    name: 'port',
    type: 'int',
  }],
};

const args = arglens(process.argv, conf);
console.log(args);

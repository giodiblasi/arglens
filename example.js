const { parser } = require('./arglens').parser;
const { OPTION, INTEGER } = require('./arglens').argumentTypes;

const conf = {
  arguments: [{
    name: 'port',
    type: INTEGER,
    default: 234,
    description: 'port number',
  }, {
    name: 'help',
    type: OPTION,
    default: false,
    description: 'boolean flag',
  }],
};

parser.useConfiguration(conf);

parser.parse(process.argv)
  .onError((messages) => { console.log(messages); })
  .onSuccess((args) => {
    if (args.help) console.log(parser.getHelpMessage());
    else console.log(args.port);
  });

const arglens = require('./index');
const { OPTION, INTEGER } = require('./parserTypes');

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

arglens.useConfiguration(conf);

arglens.parse(process.argv)
  .onError((messages) => { console.log(messages); })
  .onSuccess((args) => {
    if (args.help) console.log(arglens.getHelpMessage());
    else console.log(args.port);
  });

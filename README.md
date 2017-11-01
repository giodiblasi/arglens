<h1 align="center">ArgLens (1.0.0)</h1>
<h3 align="center">A Configurable arguments parser for Node.js Application</h3>


## Getting Started
Import dependencies:
```javscript
const { parser } = require('arglens');
const { OPTION, INTEGER, STRING } = require('arglens').argumentTypes;
```
Initialize parser with your configuration:
```javscript
    configuration = {
        arguments: [{
            name: 'portNumber',
            type: INTEGER,
            description: 'port number',
            default: '8080',
        }]
    };

    parser.useConfiguration(configuration);
```

and use arglens in this way:
```javscript
    parser.parse(process.argv)
        .onError((messages) => { 
            //your code
        })
        .onSuccess((args) => {
            //here you can use args.portNumber
        });
```

## Built-In parser:
ArgLens has three built-in parser
+ STRING
+ OPTION
+ INTEGER

### "Option" argument:
An "option" arguments is a flag, in configuration you should specify a default value.
To set an option argument use a -- prefix:
```javscript
    configuration = {
        arguments: [{
            name: 'flag',
            type: OPTIONS,
            description: '',
            default: false,
        }]
    };

    parser.useConfiguration(configuration);

    parser.parse(['--flag'])
        .onSuccess((args)=> {
            // args.flag is true
        });
    

```

## Custom parser:
It is possible to extend arglens with your own custom parsers,
for example, if you want to add a 'greetingParser:

```javscript
const greetingParser = {
  type: 'greeting',
  parse: value => parsingSuccess(`hello ${value}`),
};
```
Use parsingSuccess(parsedValue) or parsingError('error message') to return from your parse method

```javscript
configuration = {
        arguments: [{
            name: 'm',
            type: 'greeting',
            description: '',
            default: '',
    }]
}

parser.useConfiguration(configuration);
parser.useExtension([greetingParser]);


 
parser.parse(['-m', 'world'])
.onSuccess((args)=>
    {
        //args.m is 'hello world'
    });
```


## Help Message
Arglens can build an help message that describes all the argument specified in your configuration:

```javscript
 configuration = {
        arguments: [{
            name: 'portNumber',
            type: INTEGER,
            description: 'port number',
            default: '8080',
        },
        {
            name: 'bufferSize',
            type: INTEGER,
            description: 'max buffer size(KB)',
            default: '1024',
        }]
    };

    [...]

    console.log(parser.getHelpMessege());
```

```bash
    Arguments description:

    -portNumber:    port number (default: 8080)
    -bufferSize:     max buffer size(KB) (default: 1024)
```
[![Build Status](https://travis-ci.org/giodiblasi/arglens.svg?branch=master)](https://travis-ci.org/giodiblasi/arglens)

[![Coverage Status](https://coveralls.io/repos/github/giodiblasi/arglens/badge.svg?branch=master)](https://coveralls.io/github/giodiblasi/arglens?branch=master)

<h1 align="center">ArgLens</h1>
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

and use ArgLens in this way:
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
ArgLens has three built-in parsers
+ STRING
+ OPTION
+ INTEGER

### "Option" argument:
An "option" argument is a flag, in configuration you should specify a default value.
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

## Custom parsers:
It is possible to extend ArgLens with your own custom parsers.
For example, if you want to add a 'greetingParser':

### Write your parser
```javscript
const greetingParser = {
  type: 'greeting',
  parse: value => parsingSuccess(`hello ${value}`),
};
```
Use parsingSuccess(parsedValue) or parsingError('error message') to return from your parse method
### Add your parser to ArgLens
```javscript
   parser.useExtension([greetingParser]);
```
### Use your parser
Now you are able to use the new parser in your configuration
```javscript
configuration = {
        arguments: [{
            name: 'hello',
            type: 'greeting',
            description: 'this is a polite parser',
            default: 'world',
    }]
}

parser.useConfiguration(configuration);



 
parser.parse(['-hello', 'Jhon'])
.onSuccess((args)=>
    {
        //args.hello is 'hello Jhon'
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
Output:
```bash
    Arguments description:

    -portNumber:    port number (default: 8080)
    -bufferSize:     max buffer size(KB) (default: 1024)
```

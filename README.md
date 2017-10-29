<h1 align="center;">ArgLens (1.0.0)</h1>
<h3 align="center;">A Configurable arguments parser for Node.js Application</h3>


## Getting Started
Initialize arglens wit your configuration:
```javscript

    configuration = {
        arguments: [{
            name: 'portNumber',
            type: 'int',
            description: 'port number',
            default: '8080',
        }]
    };

    arglens.useConfiguration(configuration);
```

and use arglens in this way:
```javscript
    arglens.parse(process.argv)
        .onError((messages) => { 
            //your code
        })
        .onSuccess((args) => {
            //here you can use args.portNumber
        });
```

## Built-In parser:
ArgLens has three built-in parser
+ 'string'
+ 'int'
+ 'option'

### "Option" argument:
An "option" arguments is a flag, in configuration you should specify a default value.
To set an option argument use a -- prefix:
```javscript
    configuration = {
        arguments: [{
            name: 'flag',
            type: 'option',
            description: '',
            default: false,
        }]
    };

    arglens.useConfiguration(configuration);

    arglens(['--flag'])
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

arglens.useConfiguration(configuration);
arglens.useExtension([greetingParser]);


 
arglens(['-m', 'world'])
.onSuccess((args)=>
    {
        //args.m is 'hello world'
    });



```

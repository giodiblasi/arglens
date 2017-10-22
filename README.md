# Arg Lens (0.1.0)

A Configurable argument parser for Node.js Application

## How to Use
+ Create a configuration like this:
    ```javscript
    configuration = {
        arguments: [{
            name: 'm',
            type: 'string',
            description: 'm is a message',
            default: '',
    }]
    }
    ```
+ call arglens with this configuration:
    ```javscript
        arglens(['-m', 'hello'], configuration);
    ```
    or passing process.argv
    ```javscript
        arglens(process.argv, configuration);
    ```

arglens return an object like this:
```javscript
    {
        m:{
            rawValue:'hello',
            value:'hello,
            error:false,
            errorMessage:''
        }
    }
```
- rawValue: is the value passe d as input
- value: is the parsed value,
- error: true when some error occours
- errorMessage: filled when error is true, contains an error description

## Built-In parser:
+ 'string'
+ 'int'


## Custom parser:
It is possible to extend arglens with custom parser,

```javscript
configuration = {
        arguments: [{
            name: 'm',
            type: 'greeting',
            description: '',
            default: '',
    }]
}

const greetingParser = {
  type: 'greeting',
  parse: value => parsingSuccess(`hello ${value}`),
};
 
const args = arglens(['-m', 'world'], configuration);

args.m.value; //hello world

```

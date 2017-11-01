/* global describe it */
const arglens = require('../arguments/argProcessor');
const { parsingSuccess } = require('../parsers/parseResult');
const { assert } = require('chai');

const configuration = {
  arguments: [{
    name: 'x',
    type: 'custom',
    description: 'x is a message',
    default: '',
  }],
};

const customParser = {
  type: 'custom',
  parse: value => parsingSuccess(`hello ${value}`),
};

describe('custom parser tests ', () => {
  it('should use custom parser', () => {
    arglens(['-x', 'world'], configuration, [customParser])
      .onSuccess((args) => {
        assert.equal(args.x, 'hello world');
      })
      .onError(() => assert.fail());
  });
});

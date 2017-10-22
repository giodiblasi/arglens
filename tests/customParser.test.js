/* global describe it */
const arglens = require('../arglens');
const { parsingSuccess } = require('../parseResult');
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

describe('argument tests ', () => {
  it('should use custom parser', () => {
    const args = arglens(['-x', 'world'], configuration, [customParser]);
    assert.equal(args.x.value, 'hello world');
  });
});

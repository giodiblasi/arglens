/* global describe it */
const arglens = require('../arglens');
const { assert } = require('chai');

const configuration = {
  arguments: [{
    name: 'x',
    type: 'int',
    description: 'x is an integer number',
    default: '',
  }],
};

describe('integer argument tests ', () => {
  it('should get right int value', () => {
    const args = arglens(['-x', '3'], configuration);
    assert.equal(args.x.value, 3);
  });

  it('should get 0', () => {
    const args = arglens(['-x', '0'], configuration);
    assert.equal(args.x.value, 0);
  });

  it('should get -1', () => {
    const args = arglens(['-x', '-1'], configuration);
    assert.equal(args.x.value, -1);
  });

  it('should get parsing error', () => {
    const args = arglens(['-x', '3a'], configuration);
    assert.equal(args.x.error, true);
  });
});

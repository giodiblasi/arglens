/* global describe it */
const arglens = require('../arglens');
const { assert } = require('chai');

const configuration = {
  arguments: [{
    name: 'm',
    type: 'string',
    description: 'm is a message',
    default: '',
  }],
};

describe('string argument tests ', () => {
  it('should get string value', () => {
    const args = arglens(['-m', 'hello'], configuration);
    assert.equal(args.m.value, 'hello');
  });
});

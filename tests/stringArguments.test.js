/* global describe it */
const arglens = require('../arguments/argProcessor');
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
    arglens(['-m', 'hello'], configuration)
      .onSuccess((args) => { assert.equal(args.m, 'hello'); })
      .onError(() => assert.fail());
  });
});

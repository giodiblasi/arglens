/* global describe it */
const arglens = require('../arglens');
const { assert } = require('chai');

const configuration = {
  arguments: [{
    name: 'x',
    type: 'string',
    description: 'x is a message',
    default: '',
  },
  {
    name: 'y',
    type: 'string',
    description: 'y is a message',
    default: '',
  },
  {
    name: 'z',
    type: 'notvalid',
    description: 'y is a message',
    default: '',
  }],
};


describe('argument tests ', () => {
  it('should get all arguments', () => {
    const args = arglens(['-x', 'hello', '-y', 'world'], configuration);
    assert.equal(args.x.value, 'hello');
    assert.equal(args.y.value, 'world');
  });

  it('should get second arg if first fails', () => {
    const args = arglens(['-a', 'hello', '-y', 'world'], configuration);
    assert.equal(args.a.error, true);
    assert.equal(args.y.value, 'world');
  });

  it('check not arg found error', () => {
    const args = arglens(['-a', 'hello'], configuration);
    assert.equal(args.a.error, true);
    assert.equal(args.a.errorMessage, 'argument a not found in configuration');
  });

  it('check type not found', () => {
    const args = arglens(['-z', 'hello'], configuration);
    assert.equal(args.z.error, true);
    assert.equal(args.z.errorMessage, 'no parser found for type notvalid');
  });
});

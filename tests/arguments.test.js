/* global describe it */
const arglens = require('../argExtractor');
const { assert } = require('chai');

const configuration = {
  arguments: [{
    name: 'x',
    type: 'string',
    description: 'x is a message',
    default: 'default',
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
    assert.equal(args.x, 'hello');
    assert.equal(args.y, 'world');
  });

  it('should get second arg if first fails', () => {
    const args = arglens(['-z', 'hello', '-y', 'world'], configuration);
    assert.equal(args.error, true);
    assert.equal(args.y, 'world');
  });

  it('should get default value of missing arg', () => {
    const args = arglens(['-y', 'hello'], configuration);
    assert.equal(args.x, 'default');
  });

  it('check type not found', () => {
    const args = arglens(['-z', 'hello'], configuration);
    assert.equal(args.error, true);
    assert.deepEqual(args.errorMessages, ['no parser found for type notvalid']);
  });
});

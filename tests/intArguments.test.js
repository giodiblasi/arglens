/* global describe it */
const arglens = require('../argProcessor');
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
    arglens(['-x', '3'], configuration)
      .onError(() => assert.fail())
      .onSuccess((args) => {
        assert.equal(args.x, 3);
      });
  });

  it('should get 0', () => {
    arglens(['-x', '0'], configuration)
      .onError(() => assert.fail())
      .onSuccess((args) => {
        assert.equal(args.x, 0);
      });
  });

  it('should get -1', () => {
    arglens(['-x', '-1'], configuration)
      .onError(() => assert.fail())
      .onSuccess((args) => {
        assert.equal(args.x, -1);
      });
  });

  it('should get parsing error', () => {
    arglens(['-x', '3a'], configuration)
      .onError(message => assert.deepEqual(message, ['unable to parse 3a for type: int']))
      .onSuccess(() => assert.fail());
  });
});

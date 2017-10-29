/* global describe it */
const arglens = require('../argProcessor');
const { assert } = require('chai');

const getOptionConfWithDefault = defaultValue => ({
  arguments: [{
    name: 'flag',
    type: 'option',
    description: 'flag is an option',
    default: defaultValue,
  }],
});

describe('option argument tests ', () => {
  it('should get true if default is false', () => {
    arglens(['--flag'], getOptionConfWithDefault(false))
      .onSuccess((args) => { assert.equal(args.flag, true); })
      .onError(() => assert.fail());
  });

  it('should get false if default is true', () => {
    arglens(['--flag'], getOptionConfWithDefault(true))
      .onSuccess((args) => { assert.equal(args.flag, false); })
      .onError(() => assert.fail());
  });

  it('should default value', () => {
    arglens([], getOptionConfWithDefault(true))
      .onSuccess((args) => { assert.equal(args.flag, true); })
      .onError(() => assert.fail());
  });
});


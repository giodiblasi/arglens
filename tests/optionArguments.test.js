/* global describe it */
const arglens = require('../argExtractor');
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
    const args = arglens(['--flag'], getOptionConfWithDefault(false));
    assert.equal(args.flag, true);
  });

  it('should get false if default is true', () => {
    const args = arglens(['--flag'], getOptionConfWithDefault(true));
    assert.equal(args.flag, false);
  });

  it('should default value', () => {
    const args = arglens([], getOptionConfWithDefault(true));
    assert.equal(args.flag, true);
  });
});


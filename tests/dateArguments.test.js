/* global describe it */
const arglens = require('../src/arguments/argProcessor');
const { assert } = require('chai');

const configuration = {
  arguments: [{
    name: 'x',
    type: 'date',
    description: 'x is a date',
    default: '',
  }],
};

describe('date argument tests ', () => {
  it('should get right date value', () => {
    arglens(['-x', '2018-01-21T10:20:30Z'], configuration)
      .onError(() => assert.fail())
      .onSuccess((args) => {
        assert.equal(args.x.getDate(), 21);
        assert.equal(args.x.getMonth() + 1, 1);
        assert.equal(args.x.getFullYear(), 2018);
      });
  });


  it('should get parsing error', () => {
    arglens(['-x', '3a'], configuration)
      .onError(message => assert.deepEqual(message, ['unable to parse 3a for type: date']))
      .onSuccess(() => assert.fail());
  });
});

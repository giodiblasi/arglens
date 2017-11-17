/* global describe it */
const arglens = require('../src/arguments/argProcessor');
const { assert } = require('chai');

const rightConfiguration = {
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
  ],
};

const wrongConfiguration = {
  arguments: [
    {
      name: 'z',
      type: 'notvalid',
      description: 'y is a message',
      default: '',
    },
  ],
};


describe('argument tests ', () => {
  it('should get all arguments', () => {
    arglens(['-x', 'hello', '-y', 'world'], rightConfiguration)
      .onSuccess((args) => {
        assert.equal(args.x, 'hello');
        assert.equal(args.y, 'world');
      })
      .onError(() => { assert.fail(); });
  });

  it('should get default value of missing arg', () => {
    arglens(['-y', 'hello'], rightConfiguration)
      .onSuccess((args) => {
        assert.equal(args.x, 'default');
      })
      .onError(() => { assert.fail(); });
  });

  it('check type not found', () => {
    arglens(['-z', 'hello'], wrongConfiguration)
      .onError((errorMessages) => {
        assert.deepEqual(errorMessages, ['no parser found for type notvalid']);
      })
      .onSuccess(() => { assert.fail(); });
  });
});

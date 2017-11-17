/* global describe it */
const { getHelpMessage } = require('../src/utils/helpMessage');
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
    type: 'int',
    description: 'y is an int',
  },
  {
    name: 'b',
    type: 'option',
    description: 'b is a bool',
  },
  ],
};


describe('help message test ', () => {
  it('should build right message', () => {
    const message = getHelpMessage(configuration.arguments);
    assert.equal(message, '\nArguments description:\n\n -x:\t x is a message (default: default)\n -y:\t y is an int \n--b:\t b is a bool \n');
  });
});

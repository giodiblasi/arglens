/* global describe it */
const { getHelpMessage } = require('../helpMessage');
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
    default: '3',
  },
  ],
};


describe('help message test ', () => {
  it('should build right message', () => {
    const message = getHelpMessage(configuration.arguments);
    assert.equal(message, '\nArgument description:\n\nx[default]: x is a message\ny[3]: y is an int\n');
  });
});

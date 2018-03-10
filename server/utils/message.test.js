var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Mello';
        var text = 'Hello there!';
        var message = generateMessage(from, text);

        expect(message.createdAt).ToBeA('number');
        expect(message.toInclude({from, text}));
    });
});
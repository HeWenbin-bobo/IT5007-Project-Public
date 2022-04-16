var amqp = require('amqplib');

async function sendMessage() {
    await amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {
            var q = 'hello';
            var msg = 'Hello World!';

            var ok = ch.assertQueue(q, {durable: false});

            await ok.then(async function(_qok) {
                // NB: `sentToQueue` and `publish` both return a boolean
                // indicating whether it's OK to send again straight away, or
                // (when `false`) that you should wait for the event `'drain'`
                // to fire before writing again. We're just doing the one write,
                // so we'll ignore it.
                ch.sendToQueue(q, Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);
                await ch.close();
                return true;
            });
        }).finally(async function() { await conn.close(); });
    }).catch(console.warn);
}

async function receiveMessage() {
    amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {
            var ok = ch.assertQueue('hello', {durable: false});

            await ok.then(async function(_qok) {
                ch.consume('hello', function(msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                }, {noAck: true});
                await ch.close();
                return true;
            });
        }).finally(async function() { await conn.close(); });
    }).catch(console.warn);
}

module.exports = { sendMessage, receiveMessage };
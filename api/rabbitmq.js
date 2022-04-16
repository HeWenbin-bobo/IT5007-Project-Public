var amqp = require('amqplib');

async function sendMessage() {
    await amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {
            var q = 'hello';
            var msg = 'Hello World!';

            var ok = await ch.assertQueue(q, {durable: false});

            if (ok) {
                // NB: `sentToQueue` and `publish` both return a boolean
                // indicating whether it's OK to send again straight away, or
                // (when `false`) that you should wait for the event `'drain'`
                // to fire before writing again. We're just doing the one write,
                // so we'll ignore it.
                ch.sendToQueue(q, Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);
                return ch.close();
            };
        }).finally(function() { conn.close(); });
    }).catch(console.warn);
}

async function receiveMessage() {
    await amqp.connect('amqp://localhost').then(function(conn) {
        process.once('SIGINT', function() { conn.close(); });
        return conn.createChannel().then(async function(ch) {

            var ok = ch.assertQueue('hello', {durable: false});

            if (ok) {
                await ch.consume('hello', function(msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                }, {noAck: true});
            };

            return ch.close();

        }).finally(function() { conn.close(); });
    }).catch(console.warn);
}

module.exports = { sendMessage, receiveMessage };
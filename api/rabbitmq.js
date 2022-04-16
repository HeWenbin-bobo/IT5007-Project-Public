var amqp = require('amqplib');
const queue = 'hello';

async function sendMessage(msg) {
    await amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {

            const ok = await ch.assertQueue(queue, {durable: false});

            if (ok) {
                // NB: `sentToQueue` and `publish` both return a boolean
                // indicating whether it's OK to send again straight away, or
                // (when `false`) that you should wait for the event `'drain'`
                // to fire before writing again. We're just doing the one write,
                // so we'll ignore it.
                ch.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);
                return ch.close();
            };
        }).finally(function() { conn.close(); });
    }).catch(console.warn);
}

async function receiveMessage() {
    await amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {

            const ok = ch.assertQueue('hello', {durable: false});

            if (ok) {
                await ch.consume(queue, function(msg) {
                    console.log(" [x] Received '%s'", msg.content.toString());
                }, {noAck: true});
            };

            return ch.close();

        }).finally(function() { conn.close(); });
    }).catch(console.warn);
}

module.exports = { sendMessage, receiveMessage };
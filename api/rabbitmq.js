const { getDb, getNextRabbitMQId } = require('./db.js');

var amqp = require('amqplib');
const queue = 'NUSSwap';

async function rabbitmqInit( userId ) {
    const db = getDb();
    const rabbitmqCounter = await db.collection('rabbitmqCounters')
    rabbitmqCounter.remove({ _id: 'rabbitmq'+String(userId) });
    rabbitmqCounter.insert({ _id: 'rabbitmq'+String(userId), current: 1 });

    return "Successfully Init";
}

async function sendMessage(msg) {
    await amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {

            const ok = await ch.assertQueue(queue, {durable: false});

            if (ok) {
                ch.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);
                return ch.close();
            };
        }).finally(function() { conn.close(); });
    }).catch(console.warn);
}

async function receiveMessage() {
    var message;

    await amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(async function(ch) {

            const ok = ch.assertQueue(queue, {durable: false});

            if (ok) {
                await ch.consume(queue, function(msg) {
                    messgae = msg;
                    console.log(" [x] Received '%s'", msg.content.toString());
                }, {noAck: true});
            };

            return ch.close();

        }).finally(function() { conn.close(); return message });
    }).catch(console.warn);
}

async function rabbitmqList(_, { userId } ) {
    const db = getDb();
    const rabbitmq = await db.collection('rabbitmq').find({userId: userId}).toArray();

    return rabbitmq;
}

async function rabbitmqCreate( temp ) {
    const {msg} = temp;

    await sendMessage(msg);

    const msgReceive = await receiveMessage();
    const rabbitmq = createRabbitMQMessage(msgReceive);
    rabbitmq.id = await getNextRabbitMQId('rabbitmq'+String(userId))-1;
    rabbitmq.tradeId = rabbitmq.id;

    const result = await rabbitmqAdd(rabbitmq);

    return result;
}

function generateRabbitMQMessage( msg ) {
    const columns = ['userId', 'state', 'symbol', 'orderType', 'side', 'quantity', 'price', 'note'];
    const msgArray = msg.split(',');
    if (temp.length == 1) {
        const rabbitmq = { note: msg };
    } else {
        const rabbitmq = {};
        for (var i = 0; i < msgArray.length; i++) {
            rabbitmq[columns.at(i)] = msgArray.at(i);
        }
        rabbitmq.note == undefined? '' : rabbitmq.note;
    }

    return rabbitmq;
}

async function rabbitmqAdd( rabbitmq ) {
    const db = getDb();
    const newRabbitmq = Object.assign({}, rabbitmq);
    const result = await db.collection('rabbitmq').insertOne(newRabbitmq);

    return "Successfully add a rabbitmq record";
}

module.exports = { rabbitmqInit, sendMessage, receiveMessage, rabbitmqList, rabbitmqCreate, createRabbitMQMessage, rabbitmqAdd };
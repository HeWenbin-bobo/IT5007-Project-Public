/* const { UserInputError } = require('apollo-server-express'); */
const { getDb, getNextHistoryId } = require('./db.js');

async function historyInit( userId, balance ) {
    const db = getDb();
    const historyCounter = await db.collection('historyCounters')
    historyCounter.remove({ _id: 'history'+String(userId) });
    historyCounter.insert({ _id: 'history'+String(userId), current: 1 });

    const history = await db.collection('history');
    let myDate = new Date();//获取系统当前时间
    if (myDate.getMinutes()<10) {
        history.insert({ id:0, userId: userId, time: `${myDate.getHours()}:0${myDate.getMinutes()}`, balance: balance });
    } else {
        history.insert({ id:0, userId: userId, time: `${myDate.getHours()}:${myDate.getMinutes()}`, balance: balance });
    }

    return "Successfully Init";
}

async function historyList(_, { userId } ) {
    const db = getDb();
    const history = await db.collection('history').find({userId: userId}).toArray();
    return history;
}

async function historyFind(_, { history }) {
    const userId = history.userId;
    const time = history.time;
    const db = getDb();

    const historyMatch = await db.collection('history')
        .find({ time: time, userId: userId }).toArray();
    return historyMatch;
}

module.exports = { historyInit, historyList, historyFind, /*addHistory*/ };
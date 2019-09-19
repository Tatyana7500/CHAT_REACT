const DAO = require('./dao');
const config = require('../../config');
const mysql = require('mysql');

function MessagesDaoMySqlDB() {
    this.connection = null;
    this.model = null;
}

MessagesDaoMySqlDB.prototype = Object.create(DAO.prototype);
MessagesDaoMySqlDB.prototype.constructor = MessagesDaoMySqlDB;

MessagesDaoMySqlDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.mysql;

    this.connection = mysql.createConnection(url);
    this.connection.connect();

    console.log("Connected!");
};

MessagesDaoMySqlDB.prototype.create = async function (obj) {
    await this.model.query(`insert into messages(message, sender , receiver , date) values($1,$2,$3,$4)`, [obj.message, obj.sender, obj.receiver , obj.date]);
};

MessagesDaoMySqlDB.prototype.readByReceiver = async function (receiver) {
    let messages;
    await this.model.query("select * from messages where receiver = $1" ,[receiver])
        .then((res) => messages = res.rows);

    return messages;
};

MessagesDaoMySqlDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    let sent ;
    let received;
    await this.model.query("select * from messages where sender = $1 and receiver = $2", [sender, receiver])
        .then((result) => {sent = result.rows});

    await this.model.query("select * from messages where sender = $1 and receiver = $2", [receiver, sender])
        .then((result) => { received= result.rows});


    const messages = [...sent, ...received];
    messages.sort(dynamicSort("date"));

    return messages;
};

function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    }
}

module.exports = MessagesDaoMySqlDB;
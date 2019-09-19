const DAO = require('./dao');
const config = require('../../config');
const mysql = require('mysql2');

const messages = `create table if not exists messages(
  _id INT PRIMARY KEY AUTO_INCREMENT,
  message VARCHAR(255) NOT NULL,
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL)`;

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

    this.connection = mysql.createConnection(url).promise();
    this.connection.connect(function(err){
        if (err) {
            return console.error('Ошибка: ' + err.message);
        }
        else{
            console.log('Подключение к серверу MySQL успешно установлено');
        }
    });

    this.connection.query(messages, function(err, results) {
        if(err) console.log(err);
        else console.log('Таблица создана');
    });
};

MessagesDaoMySqlDB.prototype.create = async function (obj) {
    await this.connection.query(`INSERT INTO messages(message, sender, receiver, date) VALUES(${obj.message}, ${obj.sender}, ${obj.receiver}, ${obj.date})`);
};

MessagesDaoMySqlDB.prototype.readByReceiver = async function (receiver) {
    let messages;

    await this.connection.query(`SELECT * FROM messages WHERE receiver = '${receiver}'`)
        .then(([rows]) => {
            messages = rows;
        });

    messages = conversionMessages(messages);

    return messages;
};

MessagesDaoMySqlDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    let sent;
    let received;

    await this.connection.query(`SELECT * FROM messages WHERE sender = '${sender}' AND receiver = '${receiver}'`)
        .then(([rows]) => {
            sent = rows;
        });

    await this.connection.query(`SELECT * FROM messages WHERE sender = '${receiver}' AND receiver = '${sender}'`)
        .then(([rows]) => {
            received = rows;
        });

    let messages = [...sent, ...received];

    messages = conversionMessages(messages);
    messages.sort(dynamicSort("date"));

    return messages;
};

function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    }
}

function conversionMessages(obj) {
    let messages = [];

    for (let i = 0; i < obj.length; i++) {
        const message = { _id: obj[i]._id, message: obj[i].message, sender: obj[i].sender, receiver: obj[i].receiver, date: obj[i].date };
        messages.push(message);
    }

    return messages;
}

module.exports = MessagesDaoMySqlDB;
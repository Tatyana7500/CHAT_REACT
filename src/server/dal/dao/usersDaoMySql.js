const DAO = require('./dao');
const config = require('../../config');
const mysql = require('mysql2');

const users = `create table if not exists users(
  _id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL)`;

function UsersDaoMySqlDB() {
    this.connection = null;
    this.model = null;
}

UsersDaoMySqlDB.prototype = Object.create(DAO.prototype);
UsersDaoMySqlDB.prototype.constructor = UsersDaoMySqlDB;

UsersDaoMySqlDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.mysql;

    this.connection = mysql.createConnection(url).promise();
    this.connection.connect(function(err){
        if (err) {
            return console.error('Ошибка: ' + err.message);
        } else {
            console.log('Подключение к серверу MySQL успешно установлено');
        }
    });

    this.connection.query(users, function(err, results) {
        if(err) console.log(err);
        else console.log('Таблица создана');
    });
};

UsersDaoMySqlDB.prototype.create = async function (obj) {
    await this.connection.query(`INSERT INTO users(name, email, password) VALUES('${obj.name}', '${obj.email}', '${obj.password}')`);
};

UsersDaoMySqlDB.prototype.readUser = async function (email, password) {
    let user = [];

    await this.connection.execute(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`)
        .then(([rows]) => {
            user = rows;
        });

    user = conversionUsers(user);

    return user;
};

UsersDaoMySqlDB.prototype.readAll = async function () {
    let users = [];

    await this.connection.query('SELECT * FROM users')
        .then(([rows]) => {
            users = rows;
        });

    users = conversionUsers(users);

    return users;
};

UsersDaoMySqlDB.prototype.readUserToId = async function (id) {
    let user;

    await this.connection.query(`SELECT * FROM users WHERE _id = ${id}`)
        .then(([rows]) => {
            user = rows;
        });

    user = conversionUsers(users);

    return user;
};

function conversionUsers(obj) {
    let users = [];

    for (let i = 0; i < obj.length; i++) {
        const user = { _id: obj[i]._id, name: obj[i].name, email: obj[i].email, password: obj[i].password };
        users.push(user);
    }

    return users;
}

module.exports = UsersDaoMySqlDB;
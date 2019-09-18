const DAO = require('./dao');
const config = require('../../config');
const mysql = require('mysql');

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

    this.connection = mysql.createConnection(url);
    this.connection.connect();

    console.log("Connected!");

};

UsersDaoMySqlDB.prototype.create = async function (obj) {
    await this.model.query(`insert into users(name, email, password) values($1,$2,$3)` , [obj.name,obj.email,obj.password])
};

UsersDaoMySqlDB.prototype.readUser = async function(email, password) {
    return await this.model.query(`select * from users where email=$1 and password =$2` , [email , password])
        .then((users)=>users.rows[0])
};

UsersDaoMySqlDB.prototype.readAll = async function () {
    return await this.model.query('select * from users')
        .then((users) => users.rows)
};

UsersDaoMySqlDB.prototype.readUserToId = async function(id) {
    let user;
    await this.model.query(`select * from users where _id = $1` , [id])
        .then((r)=>{user = r.rows});
    return user
};

module.exports = UsersDaoMySqlDB;
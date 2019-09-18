const constants = require('./constants');

module.exports = {
    databaseType: constants.MYSQL,
    settings: {
        redis: {
            connectionString: "",
        },
        mysql: {
            host: 'localhost',
            user: 'DESKTOP-J7UCMGS',
            password: '',
            database: 'chatdb',
            port: 8080
        }
    },
};
const constants = require('./constants');

module.exports = {
    databaseType: constants.MONGO,
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
        },
        mongo: {
            connectionString: 'mongodb://localhost:27017',
        },
        postgres: {
            connectionPostgres: {
                user: "postgres",
                password: "qazxsw01",
                host: "localhost",
                port: 5432,
                database: "chatDB"
            }
        }
    },
};
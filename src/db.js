const mongoose = require('mongoose');
const DBException = require('./common/exceptions/DBException');

module.exports = {
    connect: async (mongoUrl) => {
        mongoose.connect(mongoUrl, (err) => {
            if (err) throw new DBException('Db Connection error');
        });
    },
    close: async () => {
        await mongoose.connection.close();
    },
};

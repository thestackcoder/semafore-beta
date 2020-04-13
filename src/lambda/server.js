const mongoose = require('mongoose');

// DB config
const dbUrl = `mongodb+srv://sema_user:${process.env.MONGODB_PASSWORD}@cluster0-gjhmw.mongodb.net/test?retryWrites=true&w=majority`,
    dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

// Connect ot DB
mongoose.connect(dbUrl, dbOptions)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db;
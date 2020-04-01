const mongoose = require('mongoose');

// DB config
const dbUrl = "mongodb+srv://sema_user:sema123@cluster0-gjhmw.mongodb.net/test?retryWrites=true&w=majority", 
dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect ot DB
mongoose.connect(dbUrl, dbOptions)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db;
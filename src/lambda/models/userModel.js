const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// const saltRounds = 10;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    regitered_date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'super_admin'
    }
});

// UserSchema.pre('save', function (next) {
//     // Check if document is new or a new password has been set
//     if (this.isNew || this.isModified('password')) {
//         // Saving reference to this because of changing scopes
//         const document = this;
//         bcrypt.hash(document.password, saltRounds,
//             function (err, hashedPassword) {
//                 if (err) {
//                     next(err);
//                 }
//                 else {
//                     document.password = hashedPassword;
//                     next();
//                 }
//             });
//     } else {
//         next();
//     }
// });

module.exports = User = mongoose.model('user', UserSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganzationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: false
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
    active: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Organization = mongoose.model('organization', OrganzationSchema);
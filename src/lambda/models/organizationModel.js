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
        type: String,
        default: "false"
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'organizational_admin'
    },
    payment_method: {
        type: String,
        default: ''
    },
    customer_id: {
        type: String,
        default: ''
    },
    subscription_id: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    number_of_employees: {
        type: String,
        default: ''
    }
});

module.exports = Organization = mongoose.model('organization', OrganzationSchema);
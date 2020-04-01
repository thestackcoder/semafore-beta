const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganzationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Organization = mongoose.model('organization', OrganzationSchema);
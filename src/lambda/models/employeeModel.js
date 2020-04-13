const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    badge: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    organisation: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
    }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
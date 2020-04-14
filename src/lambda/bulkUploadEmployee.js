import mongoose from 'mongoose'

// Load the server
import db from './server'

import Employee from './models/employeeModel'
const fs = require('fs');

const multer = require('multer');
const csv = require('fast-csv');

exports.handler = async (req, event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const fileRows = [];
        csv.fromPath(req.file.path)
            .on("data", function (data) {
                fileRows.push(data); // push each row
            })
            .on("end", function () {
                console.log(fileRows) //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
                fs.unlinkSync(req.file.path);   // remove temp file
                //process "fileRows" and respond
            })

        return {
            statusCode: 201,
            body: JSON.stringify(fileRows)
        }
    } catch (err) {
        console.log('employee.bulkupload', err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}
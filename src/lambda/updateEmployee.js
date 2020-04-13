// organizationUpdate.js
import mongoose from 'mongoose'

// Load the server
import db from './server'

// Load the organization Model
import Employee from './models/employeeModel'

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        // Parse the ID
        const data = JSON.parse(event.body),
            id = data.id,
            employee = data.employee,
            response = {
                msg: "Employee successfully updated",
                data: employee
            }

        // Use Organization.Model and id to update 
        await Employee.findOneAndUpdate({ _id: id }, employee)

        return {
            statusCode: 201,
            body: JSON.stringify(response)
        }
    } catch (err) {
        console.log('Employee.update', err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}
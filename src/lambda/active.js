// organizationUpdate.js
import mongoose from 'mongoose'

// Load the server
import db from './server'

// Load the organization Model
import Organization from './models/organizationModel'

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const headers = {
        'Accept': "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };

    try {
        // Parse the ID
        const data = JSON.parse(event.body),
            id = data.id,
            active = data.active,
            response = {
                msg: "Organization successfully updated",
                active: active
            }

        // Use Organization.Model and id to update 
        await Organization.findOneAndUpdate({ _id: id }, active)

        return {
            statusCode: 201,
            headers: headers,
            body: JSON.stringify(response)
        }
    } catch (err) {
        console.log('Organization.update', err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}
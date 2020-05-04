// productRead.js
import mongoose from 'mongoose';

// Load the server
import db from './server';

// Load the Product Model
import Organization from './models/organizationModel';

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const id = JSON.parse(event.body);
        const org = await Organization.findById(id),
            response = {
                msg: "Organization successfully found",
                data: org
            }
        // const id = JSON.parse(event.body), response = { msg: "Success", }

        // await Organization.findById(id);

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }

    } catch (err) {
        console.log(err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}
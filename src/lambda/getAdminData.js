// productRead.js
import mongoose from 'mongoose';

// Load the server
import db from './server';

// Load the Product Model
import User from './models/userModel';

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const id = JSON.parse(event.body);
        const user = await User.findById(id),
            response = {
                msg: "User successfully found",
                name: user.name,
                email: user.email
            }

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
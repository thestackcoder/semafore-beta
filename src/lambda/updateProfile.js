import mongoose from 'mongoose'
import db from './server'
import bcrypt from 'bcryptjs';
import User from './models/userModel'

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
            name = data.name,
            pwd = data.password;

        const passwordHash = await bcrypt.hash(pwd, 10);

        const obj = {
            name: name,
            password: passwordHash
        }

        const response = {
            msg: "User successfully updated",
            name: name
        }

        await User.findOneAndUpdate({ _id: id }, obj);

        return {
            statusCode: 201,
            headers: headers,
            body: JSON.stringify(response)
        }
    } catch (err) {
        console.log('User.update', err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}
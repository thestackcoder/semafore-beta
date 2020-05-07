import mongoose from 'mongoose'
import db from './server'
import bcrypt from 'bcryptjs';
import User from './models/userModel'

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    var errorStatusCode = 500;

    const headers = {
        'Accept': "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };

    try {
        // Parse the ID
        const data = JSON.parse(event.body),
            id = data.id,
            email = data.email,
            name = data.name,
            oldPwd = data.old_password,
            pwd = data.password;

        const user = await User.findById(id);
        let response = {};

        if (oldPwd) {
            const matches = await bcrypt.compare(oldPwd, user.password);

            if (!matches) {
                errorStatusCode = 404
                throw new Error(`Invalid current password`)
            }

            const passwordHash = await bcrypt.hash(pwd, 10);

            const obj = {
                email: email,
                name: name,
                password: passwordHash
            }

            response = {
                msg: user.email + " successfully updated",
                email: email,
                name: name
            }
            await User.findOneAndUpdate({ _id: id }, obj);

        } else {
            const obj = {
                email: email,
                name: name,
            }

            response = {
                msg: user.email + " successfully updated",
                email: email,
                name: name
            }
            await User.findOneAndUpdate({ _id: id }, obj);
        }


        return {
            statusCode: 201,
            headers: headers,
            body: JSON.stringify(response)
        }
    } catch (err) {
        console.log('User.update', err) // output to netlify function log
        return {
            statusCode: errorStatusCode,
            body: JSON.stringify({ msg: err.message })
        }
    }
}
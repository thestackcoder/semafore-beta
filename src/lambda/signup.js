// singup.js
import mongoose from 'mongoose';

// password encryption
import bcrypt from 'bycriptjs';

// Load the server
import db from './server';

// Load the User Model
import User from './userModel'

export async function handler(event) {
    let errorStatusCode = 500
  
    try {
        const { email, password } = JSON.parse(event.body);

        const existingUser = await User.findOne({ email });
        if (existingUser !== null) {
            errorStatusCode = 409
            throw new Error(`A user already exists with the email: ${email}`)
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const { insertedId } = await User.insertOne({
          email,
          password: passwordHash,
        });        

        return {
          statusCode: 200,
          headers: {
            "Set-Cookie": createJwtCookie(insertedId, email),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: insertedId, email }),
        }

    } catch (err) {
      return {
        statusCode: errorStatusCode,
        body: JSON.stringify({ msg: err.message }),
      }
    } finally {
    }
  }
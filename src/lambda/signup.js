// singup.js
import mongoose from 'mongoose';

// password encryption
import bcrypt from 'bcryptjs';
// import { createJwtCookie } from "../helpers/jwt-helper";
import jwt from "jsonwebtoken"
import cookie from "cookie"

// Load the server
import db from './server';

// Load the User Model
import User from './userModel'

//Creating a cookie

function createJwtCookie(userId, email) {
  const secretKey =
      "-----BEGIN RSA PRIVATE KEY-----\n" +
      process.env.JWT_SECRET_KEY +
      "\n-----END RSA PRIVATE KEY-----";

  const token = jwt.sign({ userId, email }, secretKey, {
      algorithm: "RS256",
      expiresIn: "100 days",
  });

  const jwtCookie = cookie.serialize("jwt", token, {
      secure: process.env.NETLIFY_DEV !== "true",
      httpOnly: true,
      path: "/",
  });
    
  return jwtCookie
}

exports.handler =  async(event, context) => {
    let errorStatusCode = 500
  
    try {
        const { name, email, password } = JSON.parse(event.body);

        const existingUser = await User.findOne({ email });
        if (existingUser !== null) {
            errorStatusCode = 409
            throw new Error(`A user already exists with the email: ${email}`)
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const { insertedId } = await User.create({
          name,
          email,
          password: passwordHash,
        });        

        console.log(insertedId);

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
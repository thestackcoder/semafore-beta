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
        const { email, password } = JSON.parse(event.body);

        const existingUser = await User.findOne({ email });
        if (existingUser == null) {
            errorStatusCode = 401
            throw new Error(`Invalid password or email`)
        }

        const matches = await bcrypt.compare(password, existingUser.password)
        if (!matches) {
            errorStatusCode = 401
            throw new Error(`Invalid password or email`)
        }

        const userId = existingUser._id;
        const jwtCookie =  createJwtCookie(userId, email);

        return {
          statusCode: 200,
          headers: {
            "Set-Cookie": jwtCookie,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId, email, msg: "Successfullly logged in!" }),
        }

    } catch (err) {
      return {
        statusCode: errorStatusCode,
        body: JSON.stringify({ msg: err.message }),
      }
    } finally {
    }
  }
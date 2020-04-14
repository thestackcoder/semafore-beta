// productRead.js
import mongoose from 'mongoose';

// Load the server
import db from './server';

// Load the Product Model
import Organization from './models/organizationModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const headers = {
    'Accept': "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  };

  try {
    // Use Product.Model to find all products
    const orgs = await Organization.find(),
      response = {
        msg: "Organizations successfully found",
        data: orgs
      }

    return {
      statusCode: 200,
      headers: headers,
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
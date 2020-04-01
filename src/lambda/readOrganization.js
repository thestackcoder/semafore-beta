// productRead.js
import mongoose from 'mongoose';

// Load the server
import db from './server';

// Load the Product Model
import Organization from './organizationModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Use Product.Model to find all products
    const orgs = await Organization.find(),
          response = {
            msg: "Organizations successfully found",
            data: orgs
          }
    
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
    
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}

// OrganizationDelete.js
import mongoose from 'mongoose'

// Load the server
import db from './server'

// Load the Organization Model
import Organization from './models/organizationModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const headers = {
    Accept: "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  };

  try {
    // Parse the ID
    const id = JSON.parse(event.body),
      response = {
        msg: "Organization successfully deleted"
      }


    // Use Organization.Model to delete 
    await Organization.findOneAndDelete({ _id: id })

    return {
      statusCode: 201,
      headers: headers,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('Organization.delete', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
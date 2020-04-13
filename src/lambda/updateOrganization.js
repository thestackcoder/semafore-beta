// organizationUpdate.js
import mongoose from 'mongoose'

// Load the server
import db from './server'

// Load the organization Model
import Organization from './models/organizationModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const data = JSON.parse(event.body),
          id = data.id,
          organization = data.organization,
          response = {
            msg: "Organization successfully updated",
            data: organization
          }
    
    // Use Organization.Model and id to update 
    await Organization.findOneAndUpdate({_id: id}, organization)
    
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('Organization.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
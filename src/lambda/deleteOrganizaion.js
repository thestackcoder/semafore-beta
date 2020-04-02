  
// OrganizationDelete.js
import mongoose from 'mongoose'

// Load the server
import db from './server'

// Load the Organization Model
import Organization from './OrganizationModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
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
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('Organization.delete', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
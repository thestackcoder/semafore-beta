  
// OrganizationDelete.js
import mongoose from 'mongoose'

// Load the server
import db from './server'

// Load the Organization Model
import Employee from './models/employeeModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const id = JSON.parse(event.body), response = { msg: "Employee successfully deleted" }
    
    // Use Organization.Model to delete 
    await Employee.findOneAndDelete({ _id: id })
    
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('Employee.delete', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
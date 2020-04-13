import mongoose from 'mongoose'

// Load the server
import db from './server'

import Employee from './models/employeeModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
        const data = JSON.parse(event.body),
            organisation = data.org_id,
            name = data.name,
            phone = data.phone,
            emp = {
                name: name,
                phone: phone,
                organisation: organisation
            },
            response = {
                msg: "Employee successfully created",
                data: emp
            }
    
    await Employee.create(emp)

    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('employee.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
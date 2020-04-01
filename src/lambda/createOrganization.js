import mongoose from 'mongoose'

// Load the server
import db from './server'

import Organization from './organizationModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
        const data = JSON.parse(event.body),
            name = data.name,
            transaction_id = data.transaction_id,
            org = {
                name: name,
                transaction_id: transaction_id,
            },
            response = {
                msg: "Organization successfully created",
                data: org
            }
    
    await Organization.create(org)

    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('organization.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
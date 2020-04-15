import mongoose from 'mongoose'

// Load the server
import db from './server'

import Organization from './models/organizationModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const headers = {
    'Accept': "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  };

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
      headers: headers,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('organization.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
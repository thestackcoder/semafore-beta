var co = require('co');
var mongoose = require('mongoose');

let conn = null;

const uri = "mongodb+srv://fahad:intercrew@semafore-beta-ijue7.mongodb.net/test?retryWrites=true&w=majority"

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  run().
    then(res => {
      callback(null, res);
    }).
    catch(error => callback(error));
};

function run() {
  return co(function*() {

    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0
      });
      conn.model('Organization', new mongoose.Schema({
        name: String,
        transaction_id: Number,
        date: Date
      }));
    }

    const objs = conn.model('Organization');

    const doc = yield objs.find();
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}

// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
// export function handler(event, context, callback) {
//   console.log('queryStringParameters', event.queryStringParameters)
//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({ msg: 'Hello, World!' }),
//   })
// }

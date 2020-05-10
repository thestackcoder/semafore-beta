
import axios from 'axios';

//this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const data = JSON.parse(event.body),
            organisation_id = data.organisation_id,
            status = data.status;

        axios('http://95.216.2.224:3000/updateOrgEmployeesStatus', {
            method: 'post',
            header: {
                'Accept': "application/json",
            },
            data: {
                "organisation_id": organisation_id,
                "status": status
            }
        })
            .then((data) => {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ msg: data.data.message }),
                });
            })
            .catch(error => {
                console.log(error);
            });

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message }),
        }
    } finally {
    }

}


import axios from 'axios';

//this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const data = JSON.parse(event.body),
            id = data.organisation_id;
        let count;
        let status;

        axios({
            method: 'post',
            baseURL: 'http://95.216.2.224:3000',
            url: '/getOrgMsgsCount',
            headers: {
                'Accept': "application/json",
            },
            data: {
                "organisation_id": id
            }
        })
            .then((data) => {
                count = data.data.count;
                status = data.data.status;
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ msg: "Count returned successfully!", count: count, status: status }),
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

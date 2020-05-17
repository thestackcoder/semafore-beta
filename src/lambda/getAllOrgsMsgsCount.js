
import axios from 'axios';

//this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        let array;
        let status;
        let count;

        axios({
            method: 'get',
            baseURL: 'http://95.216.2.224:3000',
            url: '/getAllOrgsMsgsCount',
        })
            .then((data) => {
                status = data.data.status;
                array = data.data.messages_stats;
                count = array.length;
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

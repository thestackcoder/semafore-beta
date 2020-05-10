
import axios from 'axios';

//this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false

    try {
        const data = JSON.parse(event.body),
            name = data.name,
            phone = data.phoneNo,
            organisation_id = data.organisation_id,
            emp = {
                name: name,
                phone: phone,
                organisation_id: organisation_id,
            },
            response = {
                msg: "Employee created successfully.",
                data: emp
            }

        var message = '';
        axios({
            method: 'post',
            url: 'http://95.216.2.224:3000/addEmployee',
            headers: {
                'Accept': "application/json",
            },
            data: {
                "name": name,
                "phoneNo": phone,
                "organisation_id": organisation_id,
            }
        })
            .then((data) => {
                console.log(data.data);
                message = data.data.message;

                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ msg: message }),
                });
            })



    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message }),
        }
    } finally {
    }

}

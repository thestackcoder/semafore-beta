const stripe = require('stripe')('sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO');

export function handler(event, context, callback) {
    console.log('queryStringParameters', event.queryStringParameters)

    stripe.tokens.create(
        {
            card: {
                number: '4242424242424242',
                exp_month: 4,
                exp_year: 2021,
                cvc: '314',
            },
        },
        function (err, token) {
            // asynchronously called
            return token;
        }
    );

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: 'Hello, World!' }),
    })
}

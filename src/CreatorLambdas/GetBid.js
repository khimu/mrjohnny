const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    console.log(event.httpMethod);

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
    };

    if(event.httpMethod.startsWith('OPTIONS')) {
        return {
            statusCode: 200,
            headers
        };
    }

    console.log('Received event:', JSON.stringify(event, null, 2));

    let myid = event.pathParameters.id;

    console.log("event params " + myid);

    let body;
    let statusCode = '200';

    try {
        const params = {
            TableName : 'bids',
            Key: {
                id: myid
            }
        };

        body = await dynamo.get(params).promise();
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    console.log('Received event:', JSON.stringify(event, null, 2));

    return {
        statusCode,
        body,
        headers,
    };

};


const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {

    let myid = event.pathParameters.id;

    console.log("event params " + myid);

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        const params = {
            TableName : 'creator_videos',
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


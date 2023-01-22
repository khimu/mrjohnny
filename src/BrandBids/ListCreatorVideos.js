const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        // modify to list by creator if creator is logged in
        // modify by bidder if bidder is logged in
       body = await dynamo.scan({ TableName: 'creator_videos' }).promise();
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};


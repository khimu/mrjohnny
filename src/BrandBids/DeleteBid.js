const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    let myid = event.pathParameters.id;

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    var params = {
      TableName: 'bids',
      Key: {
        id: myid
      }
    };

    try {
        body = await dynamo.delete(params).promise();
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    const response = {
        statusCode,
        body,
        headers,
    };
    return response;    
};



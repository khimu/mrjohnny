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

    const creator_email = event.pathParameters.creator;
    let bidder_email = event.pathParameters.bidder;
    let filename = event.pathParameters.filename;

    console.log("event params " + creator_email);

    let body;
    let statusCode = '200';

    try {
        const params = {
            TableName : 'bids',
            IndexName: "video_key_bidder_email",
            KeyConditionExpression: 'video_key = :video_key AND bidder_email = :bidder_email',
            FilterExpression: 'creator_email = :creator_email',
            ExpressionAttributeValues: {
                ':creator_email': creator_email,
                ':bidder_email': bidder_email,
                ':video_key': creator_email + '/' + filename
            }
            ,
            Limit: 1,
        };

        body = await dynamo.query(params).promise();

        console.log(`Query response: ${JSON.stringify(body, null, 2)}`);
    } catch (err) {
        statusCode = '400';
        body = err.message;
        console.log(`Query error: ${JSON.stringify(body, null, 2)}`);
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };

};


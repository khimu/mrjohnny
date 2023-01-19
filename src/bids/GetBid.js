const AWS = require('aws-sdk');
//const querystring = require('querystring');


const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    //const formfield = querystring.parse(event.body);
    //console.log("event params " + event['params']['id']);

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        const params = {
          TableName : 'bids',
          /* Item properties will depend on your application concerns */
          Key: {
            id: '86818d4f-fddb-4c05-8fbb-4d83d884ce7a'
          }
        };
        //const id = "'" + event.queryStringParameters?.id + "'";

        
        const result = await dynamo.get(params).promise();

        return {
            statusCode,
            result,
            headers,
        };
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


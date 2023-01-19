const AWS = require('aws-sdk');
const querystring = require('querystring');


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
    console.log('Received event:', JSON.stringify(event, null, 2));

    const formfield = querystring.parse(event.body);
    
    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    var params = {
      TableName: 'bids',
      Key: {
        'id': {N: formfield['id']}
      }
    };
    
    // Call DynamoDB to delete the item from the table
    dynamo.deleteItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });

    try {
        body = await dynamo.delete(JSON.parse(event.body)).promise();
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        headers,
    };
    return response;    
};



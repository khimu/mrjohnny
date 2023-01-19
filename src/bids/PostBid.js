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

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        const formfield = querystring.parse(event.body);
        console.log('amount is ' + formfield['amount']);
        
        //print('event:', JSON.dumps(event))
        //print('queryStringParameters:', JSON.dumps(event['queryStringParameters']))

        //const obj = JSON.parse(event.body);
        //body = formfield['amount'] + " Your bid is in the queue [debug]--" + JSON.stringify(event.body);

        // amount = event['queryStringParameters']['amount']
        
        //console.log("**********id is ", obj.id);
        
        var params = {
            TableName: 'bids',
            //Key: {id: obj.id},
            Item: {
                //Key: {id: obj.id},
                //id: obj.id,
                id: create_UUID(),
                amount: formfield['amount'],
                currency: 'USD',
                content: formfield['content'],
                merchant_id: formfield['merchant_id'],
                placement_x: formfield['placement_x'],
                placement_y: formfield['placement_y'],
                frame_location: formfield['frame_location']
                
                // add email
                
                //amount: obj.amount,
               // currency:obj.currency,
               // content: obj.content,
              //  merchant_id: obj.merchant_id,
              //  placement_x: obj.placement_x,
              //  placement_y:obj.placement_y,
              //  frame_location: obj.frame_location
            }
        };      

        await dynamo.put(params).promise();
        body = "Your bid $" + formfield['amount'] + " is in the queue";
        
        //body = "Your bid " + obj.amount + " is in the queue [debug]--" + JSON.stringify(body);
        
        //body = await dynamo.update(params).promise();
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }
    
    console.log(body);

    return {
        statusCode,
        body,
        headers,
    };
};


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

console.log(create_UUID());

const AWS = require('aws-sdk');
const querystring = require('querystring');

const dynamo = new AWS.DynamoDB.DocumentClient();

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

        let id = event.pathParameters.id;

        //const obj = JSON.parse(event.body);

        var params = {
            TableName: 'bids',
            //Key: {id: obj.id},
            Item: {
                //Key: {id: obj.id},
                //id: obj.id,
                id: id,
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

const AWS = require('aws-sdk');
//const querystring = require('querystring');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    console.log(event.httpMethod);

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'PUT,HEAD,OPTIONS'
    };

    if(event.httpMethod.startsWith('OPTIONS')) {
        return {
            statusCode: 200,
            headers
        };
    }

    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';


    try {
        const obj = JSON.parse(event.body);

        let brand_image_id = obj.id;

        if(!brand_image_id) {
            brand_image_id = create_UUID();
        }

        var params = {
            TableName: 'bids',
            Item: {
                id: brand_image_id,
                amount: obj.bid_amount,
                currency: 'USD',
                bidder_email: obj.bidder_email,
                video_key: obj.video_key,
                video_id: obj.video_id,
                creator_email: obj.creator_email,
                image_key: obj.image_key,
                ad_description: obj.ad_description,
                position_x: obj.position_x,
                position_y: obj.position_y,
                frame_pixel: obj.frame_pixel,
                html_position_x: obj.html_position_x,
                html_position_y: obj.html_position_y,
                creator_accepted: false,
                created_on: Date.now()
            }
        };

        body = await dynamo.put(params).promise();
        console.log('Dynamodb response ' + JSON.stringify(body));
        body = JSON.stringify({
            brand_image_id
        });
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


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

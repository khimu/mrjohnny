const AWS = require('aws-sdk');
const querystring = require('querystring');


const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const formfield = querystring.parse(event.body);

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    
    const today = new Date();
    const date = new Date("2020-05-12T23:50:21.817Z");
    date.toString(); // Tue May 12 2020 18:50:21 GMT-0500 (Central Daylight Time)
    date.toDateString(); // Tue May 12 2020
    date.toTimeString(); // 18:50:21 GMT-0500 (Central Daylight Time)
    date.toISOString(); // 2020-05-12T23:50:21.817Z
    date.toUTCString(); // Tue, 12 May 2020 23:50:21 GMT
    date.toJSON(); // 2020-05-12T23:50:21.817Z
    date.toLocaleString(); // 5/12/2020, 6:50:21 PM
    date.toLocaleDateString(); // 5/12/2020
    date.toLocaleTimeString(); // 6:50:21 PM
    
    
    
    const release_date = new Date();

    try {
        var params = {
            TableName: 'content_scheduler',
            //Key: {id: obj.id},
            Item: {
                //Key: {id: obj.id},
                //id: obj.id,
                id: create_UUID(),
                "created_date": Date.now(),
                "content": "some image name",
                "path": "https://mrjohnny-lambdalayer.s3.amazonaws.com/uuid.js",
                "bids": 100,
                "bid_winner": "mrjohnny",
                "bid_amount": 15000,
                "release_date": 1673706489, //release_date.getTime(),
                "creator": "jeenie",
                "creator_email": "jeenie@gmail.com"
                
                
                //amount: formfield['amount'],
                //currency: 'USD',
                //content: formfield['content'],
                //merchant_id: formfield['merchant_id'],
                //placement_x: formfield['placement_x'],
                //placement_y: formfield['placement_y'],
                //frame_location: formfield['frame_location']
                
                //amount: obj.amount,
               // currency:obj.currency,
               // content: obj.content,
              //  merchant_id: obj.merchant_id,
              //  placement_x: obj.placement_x,
              //  placement_y:obj.placement_y,
              //  frame_location: obj.frame_location
            }
        };      

        body = await dynamo.put(params).promise();
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

console.log(create_UUID());

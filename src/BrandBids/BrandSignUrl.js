const AWS = require('aws-sdk');
const querystring = require('querystring');

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({region: 'us-east-1'});
const URL_EXPIRATION_SECONDS = 300;

const dynamo = new AWS.DynamoDB.DocumentClient();


// Main Lambda entry point
exports.handler = async (event) => {
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

    console.log(event.body);

    const obj = JSON.parse(event.body);

    let email = event.pathParameters.username;
    console.log('found email ' + email);
    let filename = event.pathParameters.filename;

    console.log('bid_amount is ' + obj.bid_amount);
    const S3_BUCKET = process.env.UploadBucket;
    const url = `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
    const Key = `${email}/${filename}`;

    let bid_id = obj.id;

    if(!bid_id) {
        bid_id = create_UUID();
    }

    var params = {
        TableName: 'bids',
        Item: {
            id: bid_id,
            bid_amount: obj.bid_amount,
            currency: 'USD',
            video_key: obj.video_key,
            image_key: Key,
            position_x: obj.position_x,
            position_y: obj.position_y,
            html_position_x: obj.html_position_x,
            html_position_y: obj.html_position_y,
            frame_pixel: obj.frame_pixel,
            ad_description: obj.ad_description,
            bidder_email: obj.bidder_email,
            creator_email: obj.creator_email,
            creator_accepted: false,
            filename: filename,
            s3_bucket: S3_BUCKET,
            create_date: Date.now()
        }
    };



    let result = await dynamo.put(params).promise();
    console.log('dynamodb result is ' + result);

    let type = "image";
    let extension = filename.split(".")[1];
    if(extension === 'mp4') {
        type = "video";
        extension = "mp4";
    }
    return await getUploadURL(event, email, filename, type, extension, bid_id);
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const getUploadURL = async function(event, email, filename, type, extension, bid_id) {
    const randomID = parseInt(Math.random() * 10000000);
    const Key = `${email}/${filename}`;
    const REGION = 'us-east-1';
    const S3_BUCKET = process.env.UploadBucket;
    const CONTENT_TYPE = type + "/" + extension;

    // Get signed URL from S3
    const s3Params = {
        Bucket: S3_BUCKET,
        Key,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: CONTENT_TYPE,
        ACL: 'public-read'
    }

    // image/jpg

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'PUT,HEAD,OPTIONS'
    };

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
        //const uploadURL = await s3.getSignedUrl('putObject', s3Params)
        const url= `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`


        body = JSON.stringify({
            uploadURL: uploadURL,
            Key,
            url,
            CONTENT_TYPE,
            bid_id
        });
    } catch (err) {
        statusCode = '400';
        body = err.message;
    }

    return {
        statusCode,
        body,
        headers,
    };

}
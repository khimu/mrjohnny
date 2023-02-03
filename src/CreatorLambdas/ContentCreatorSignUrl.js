const AWS = require('aws-sdk');
const querystring = require("querystring");


AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({region: 'us-east-1'});
const URL_EXPIRATION_SECONDS = 1800;

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

    const obj = JSON.parse(event.body);

    let email = event.pathParameters.username;
    console.log('found email ' + email);
    let filename = event.pathParameters.filename;

    console.log('key is ' + obj.key);
    const S3_BUCKET = process.env.UploadBucket;
    const url = `https://${S3_BUCKET}.s3.amazonaws.com/${email}/${filename}`
    const Key = `${email}/${filename}`;

    let video_id = obj.id;

    if(!video_id) {
        video_id = create_UUID();
    }

    let enable_publish = false;
    if(obj.enable_publish) {
        enable_publish = true;
    }
    let kid_friendly = false;
    if(obj.kid_friendly) {
        kid_friendly = true;
    }

    var params = {
        TableName: 'creator_videos',
        Item: {
            id: video_id,
            enable_publish: enable_publish,
            currency: 'USD',
            kid_friendly: kid_friendly,
            audience_category: obj.audience_category,
            end_bid_window: obj.end_bid_window,
            start_bid_window: obj.start_bid_window,
            open_bid_amount: obj.open_bid_amount,
            platform_api_key: obj.platform_api_key,
            social_media_platform: obj.social_media_platform,
            scheduled_release_date: obj.scheduled_release_date,
            description: obj.description,
            title: obj.title,
            creator_email: obj.creator_email,
            filename: obj.filename,
            bid_type: obj.bid_type,
            create_date: Date.now(),
            key: Key,
            image_url: url,
            creator_accepted: false
        }
    };

    let result = await dynamo.put(params).promise();

    console.log('dynamodb result is ' + JSON.stringify(result));

    let type = "image";
    let extension = filename.split(".")[1];
    if(extension === 'mp4') {
        type = "video";
        extension = "mp4";
    }
    return await getUploadURL(event, email, filename, type, extension, video_id);
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

const getUploadURL = async function(event, email, filename, type, extension, video_id) {
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
        //ACL: 'public-read'
        //x-amz-acl: 'public-read-write'
        //ContentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        //ContentType: 'application/x-www-form-urlencoded'
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
            id: video_id
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
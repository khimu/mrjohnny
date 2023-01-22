const AWS = require('aws-sdk');
const querystring = require("querystring");


AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({region: 'us-east-1'});
const URL_EXPIRATION_SECONDS = 300;


// Main Lambda entry point
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const formfield = querystring.parse(event.body);

    let email = event.pathParameters.username;
    console.log('found email ' + email);
    let filename = event.pathParameters.filename;

    console.log('amount is ' + formfield['amount']);
    const S3_BUCKET = process.env.UploadBucket;
    const url = `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
    const Key = `${email}/${filename}`;

    let bid_id = formfield['id'];

    if(bid_id===null || bid_id==="") {
        bid_id = create_UUID();
    }

    var params = {
        TableName: 'creator_videos',
        Item: {
            id: bid_id,
            enable_publish: formfield['enable_publish'],
            currency: 'USD',
            kid_friendly: formfield['kid_friendly'],
            audience_category: formfield['audience_category'],
            end_bid_window: formfield['end_bid_window'],
            start_bid_window: formfield['start_bid_window'],
            open_bid_amount: formfield['open_bid_amount'],
            platform_api_key: formfield['platform_api_key'],
            social_media_platform: formfield['social_media_platform'],
            scheduled_release_date: formfield['scheduled_release_date'],
            description: formfield['description'],
            title: formfield['title'],
            creator_email: formfield['creator_email'],
            filename: formfield['filename'],
            bidder_email: formfield['key'],
            bid_type: formfield['bid_type'],
            create_date: Date.now(),
            creator_accepted: false,
            file_name: filename,
            image_url: url
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
    return await getUploadURL(event, email, filename, type, extension);
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

const getUploadURL = async function(event, email, filename, type, extension) {
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
        'Access-Control-Allow-Origin': '*'
    };

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
        //const uploadURL = await s3.getSignedUrl('putObject', s3Params)
        const url= `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`

        body = JSON.stringify({
            uploadURL: uploadURL,
            Key,
            url,
            CONTENT_TYPE
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
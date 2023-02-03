const AWS = require('aws-sdk');
const querystring = require('querystring');

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({region: 'us-east-1'});
const URL_EXPIRATION_SECONDS = 300;


// Main Lambda entry point
exports.handler = async (event) => {
    console.log(event.httpMethod);
    console.log('Received event:', JSON.stringify(event, null, 2));

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
    };

    if(event.httpMethod.startsWith('OPTIONS')) {
        return {
            statusCode: 200,
            headers
        };
    }

    console.log('Received event:', JSON.stringify(event, null, 2));

    let email = event.pathParameters.username;
    console.log('found email ' + email);
    let filename = event.pathParameters.filename;


    let type = "image";
    let extension = filename.split(".")[1];
    if(extension === 'mp4') {
        type = "video";
        extension = "mp4";
    }

    return await getObjectURL(event, email, filename, type, extension);
}


const getObjectURL = async function(event, email, filename, type, extension) {
    const randomID = parseInt(Math.random() * 10000000);
    const Key = `${email}/${filename}`;
    const REGION = 'us-east-1';
    const S3_BUCKET = process.env.UploadBucket;
    const CONTENT_TYPE = type + "/" + extension;

    // Get signed URL from S3
    const s3Params = {
        Bucket: S3_BUCKET,
        Key,
        Expires: URL_EXPIRATION_SECONDS
    }
    //
    // var params = {Bucket: 'bucket', Key: 'key', Expires: 60};
    // var url = s3.getSignedUrl('getObject', params);
    // console.log('The URL is', url); // expires in 60 seconds

    // image/jpg

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
    };

    try {
        const uploadURL = await s3.getSignedUrlPromise('getObject', s3Params)
        //const uploadURL = await s3.getSignedUrl('putObject', s3Params)
        //const url= `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`

        console.log(uploadURL);

        body = JSON.stringify({
            uploadURL: uploadURL,
            Key,
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
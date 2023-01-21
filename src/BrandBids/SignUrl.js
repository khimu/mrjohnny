const AWS = require('aws-sdk');


AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({region: 'us-east-1'});
const URL_EXPIRATION_SECONDS = 300;



// Main Lambda entry point
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    //const formfield = querystring.parse(event.body);

    //var myHashMap = JSON.parse(event.requestContext.authorizer.claims);
    //let email = myHashMap['cognito:username'];
    //let email = event.requestContext.authorizer.claims.cognito:username;

    let email = event.pathParameters.username;
    console.log('found email ' + email);
    let filename = event.pathParameters.filename;

    let type = "image";
    let extension = filename.split(".")[1];
    if(extension === 'mp4') {
        type = "video";
        extension = "mp4";
    }
    return await getUploadURL(event, email, filename, type, extension);
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
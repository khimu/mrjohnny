const AWS = require('aws-sdk');


AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({region: 'us-east-1'});
const URL_EXPIRATION_SECONDS = 300;



// Main Lambda entry point
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    console.log('Received event:', JSON.stringify(event, null, 2));
    //const formfield = querystring.parse(event.body);

    //var myHashMap = JSON.parse(event.requestContext.authorizer.claims);
    //let email = myHashMap['cognito:username'];
    //let email = event.requestContext.authorizer.claims.cognito:username;

    console.log('found email ' + email);

    let email = event.pathParameters.username;
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

    // Get signed URL from S3
    const s3Params = {
        Bucket: process.env.UploadBucket,
        Key,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: '${type}/${extension}',
        region: REGION
    }

    // image/jpg

    let body;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

        body = JSON.stringify({
            uploadURL: uploadURL,
            Key
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

}
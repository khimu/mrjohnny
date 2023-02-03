console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
var s3bucket = new aws.S3({params: {Bucket: 'creator-videos'}});

exports.handler = async (event, context) => {

    console.log(event);

    var params = {
      Key: event.fileName,
      Body: event.fileData,
      Bucket: "creator-videos"
    };
    

    try {
        s3bucket.upload(params, function (err, res) {               
            if(err)
                console.log("Error in uploading file on s3 due to "+ err)
            else    
                console.log("File successfully uploaded.")
        });

        const { ContentType } = await s3.getObject(params).promise();
        console.log('CONTENT TYPE:', ContentType);
        return ContentType;
    } catch (err) {
        console.log(err);
//        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    //    console.log(message);
//        throw new Error(message);
    }
    //console.log('Received event:', JSON.stringify(event, null, 2));

    return JSON.stringify(event, null, 2);
};


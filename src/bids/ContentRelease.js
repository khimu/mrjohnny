const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
     
/*
    const eventName = event.Records[0].eventName;
    const dynamodbRecord = event.Records[0].dynamodb;

    if (eventName === 'REMOVE') {

      const email = dynamodbRecord.OldImage.email.S;
      console.log("Sending email to : " + email);

      //code to send email

    }
    else {
        console.log("Event is " + eventName + ", Skipping execution");
    }
    */

    console.log(JSON.stringify(event));

    return {
        statusCode: 200,
        body: "Success",
        headers: "'Access-Control-Allow-Origin': '*'",
    };
}

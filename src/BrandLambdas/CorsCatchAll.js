
exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'HEAD,DELETE,GET,POST,PUT,HEAD,OPTIONS'
    };

    if(event.httpMethod.startsWith('OPTIONS')) {
        return {
            statusCode: 200,
            headers
        };
    }

};

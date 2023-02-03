//const AWS = require('aws-sdk');
//const AWSCognito = require('aws-cognito-sdk');

const users = require("./user-management");

// Modules, e.g. Webpack:
var Cognito = require('amazon-cognito-identity-js');
var CognitoUserPool = Cognito.CognitoUserPool;


const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID
};


exports.handler = async event => {
  const body = JSON.parse(event.body);
  if (event.path === "/signup") return signUp(body);
  return signIn(body);
};

const signUp = async ({ username, password, email }) => {
  try {
    var userPool = new Cognito.CognitoUserPool(poolData);

    let dataEmail = {
      Name : 'email',
      Value : email
    };

    let attributeList = [];
    let attributeEmail = new Cognito.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    await users.signUp(username, password, attributeList);
    return createResponse({ message: "Created" }, 201);
  } catch (e) {
    console.log(e);
    return createResponse({ message: e.message }, 400);
  }
};

const signIn = async ({ username, password }) => {
  try {
    const token = await users.signIn(username, password);
    return createResponse({ token }, 201);
  } catch (e) {
    console.log(e);
    return createResponse({ message: e.message }, 400);
  }
};

const createResponse = (data = { message: "OK" }, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(data),
  headers: { "Access-Control-Allow-Origin": "*" }
});
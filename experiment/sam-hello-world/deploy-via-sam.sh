sam init -r nodejs14.x -d npm -n sam-hello-world
sam validate
echo '{"message": "Hey, are you there?" }' | sam local invoke HelloWorldFunction
sam local start-lambda

sam package --s3-bucket mrjohnny-lambdalayer --profile mrjohnny --region us-east-1 --output-template-file template-export.yml

sam deploy --template-file template-export.yml --profile mrjohnny --region us-east-1 --stack-name sam-hello-world --capabilities CAPABILITY_IAM


## to delete the lambda function
aws cloudformation delete-stack --profile mrjohnny --region us-east-1 --stack-name sam-hello-world

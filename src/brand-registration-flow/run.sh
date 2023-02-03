sam build

sam package --s3-bucket mrjohnny-deploy --output-template-file packaged.yam


sam deploy --template-file packaged.yaml \
--region eu-west-1 \
--capabilities CAPABILITY_IAM \
--stack-name your-stack

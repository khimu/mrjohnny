sam package --s3-bucket mrjohnny-deploy --output-template-file packaged.yaml


sam deploy --template-file packaged.yaml --region us-east-1 --capabilities CAPABILITY_IAM --stack-name ListBids

sam deploy --template-file /Users/khimung/CODE/mrjohnny/src/ListBids/packaged.yaml --stack-name ListBids

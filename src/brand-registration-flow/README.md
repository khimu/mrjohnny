
0.  sam delete
1.  sam build
2.  sam package --s3-bucket mrjohnny-deploy --output-template-file packaged.yaml
    3   sam deploy --template-file packaged.yaml --region us-east-1 --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM  --stack-name BrandSignupFlow


Alert - many times cors problems is indicative of other problems
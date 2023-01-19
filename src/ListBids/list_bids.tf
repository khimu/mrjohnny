variable "aws_region" {
  default     = "us-east-1"
}

provider "aws" {
  region =var.aws_region
}

provider "archive" {}
data "archive_file" "zip" {
  type        = "zip"
  source_file = "ListBids.js"
  output_path = "ListBids.zip"
}

resource "aws_iam_role" "lambda_exec" {
  name = "mrjohnny-dynamo-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
  create = false
}

## default cloudwatch ROLE
resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "iam_for_lambda" {
  role               = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::411460918332:role/service-role/mrjohnny-dynamo-lambda-role"
}

resource "aws_lambda_function" "lambda" {
  function_name = "ListBids"
  filename         = data.archive_file.zip.output_path
  source_code_hash = data.archive_file.zip.output_base64sha256
  role = aws_iam_role.lambda_exec.arn
  handler = "ListBids.handler"
  runtime = "nodejs14.x"
}

resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 1
}

resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "API"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "TerraformTest"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_route" "ListBids" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /list_bids"
  target    = "integrations/${aws_apigatewayv2_integration.ListBids.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 1
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ListBids.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

output "lambda" {
  value = aws_lambda_function.lambda.qualified_arn
}
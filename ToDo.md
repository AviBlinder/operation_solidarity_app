## SAM Workflow

########################################################################################
ToDO:
General

1. Create test scripts and run them
2. Migrate to aws-sdk v3:
   https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/migrating-to-v3.html
3. Add Authententication to Lambda functions
4. fix: Policies: AmazonDynamoDBFullAccess
   Policies:
   - DynamoDBCrudPolicy:
     TableName: !Ref BeneficiariesTable

// Re-build github repo without .aws-sam
Frontend

- [Multilanguage](https://phrase.com/blog/posts/nextjs-i18n/)
- Availability (font-size, text2voice, darkness, colors-schema)
- Accessible and **user-friendly**
  ########################################################################################

```sh
AWS_PROFILE=operation_solidarity_admin
alias sam="sam.cmd"
# or
source ./setup_environment.sh

```

### For each Entity under {domain}/code folder, run the following:

```sh
npm init
npm install uuid aws-sdk
```

### for each {domain} folder, run the following:

```
npm install mocha chai --save-dev
```

and add to package.json file

```js
    "test": "mocha --exit --recursive tests/"
```

### Building

```
sam build
sam validate
# sam local invoke InitStateFunction


# Test Function in the Cloud:
sam sync --stack-name {{stack-name}} --watch

#deploy
sam deploy --guided

# Generate event
sam local generate-event apigateway http-api-proxy
sam local generate-event s3 put

# Emulate a REST API call to a Lambda function
sam local start-api
sam local invoke ListBeneficiariesFunction -e events/event-get-all-items.json
sam local invoke PostBeneficiaryFunction -e events/event-post-item.json
sam local invoke GetBeneficiaryFunction -e events/event-get-by-id.json

```

### Testing a Lambda function

- Create a tests folder under /src/{entity}/tests
- Run (for example)

```sh
npx mocha --exit --recursive tests/
```

### Watch logs

```sh
sam logs -n sqs-example-QueueConsumerFunction-M1GVFCEH030D --tail

```

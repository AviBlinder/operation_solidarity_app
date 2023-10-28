########################################################################################
ToDo:
Frontend

2. Create Proposal form (?)
3. create 'update request' form
4. Create User form/Update Preferences Form
5. Landing Page:
6. review session? logic
7. Create Userpool + google identity

---

Routes:
/tasks/ --> sort , filter by city/distance range/availability/ and 'link to update'
/tasks/[id]
/tasks/create-request/
/tasks/create-proposal/
/tasks/update/[id]
/tasks/delete/[id]

/users/
/users/[id]/update-profile

## ?? find me a match??

---

- [Multilanguage](https://phrase.com/blog/posts/nextjs-i18n/)
- Availability (font-size, text2voice, darkness, colors-schema)
- Accessible and **user-friendly**

//
// Typhography setup:
// 1. font-size (text-sm, text-base, text-lg,text-xl...)
// 2. font-weight (font-extralight ...)
// 3. text-color (lightness lower for de-emphasazing)
// 4. letter spacing (tracking-tighter...)
// 5. Line Hight (leading-3 ...)
// 6. text-align (text-center, text-left, text-start, text-justify ...)
// 7. Vertical align (align-baseline, align-middle, align-top...)

//
Backend

1. Migrate to aws-sdk v3:
   https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/migrating-to-v3.html
2. Add Authententication to Lambda functions (via userPool)

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

### Migraring aws-sdk to V3

```sh
npx aws-sdk-js-codemod -t v2-to-v3 temp.js
```

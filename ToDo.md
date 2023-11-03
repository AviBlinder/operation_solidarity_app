########################################################################################

## ToDo:

Issues:

- test lambda with different query params
- Check whether'nonce mismatch' issue persists
- Check if there is need to manage the refresh-token flow

### ### Thursday:

1. Add tab to distinguish between requests and proposals?

2. ChatGPT -> suggestions for Hero part of landing page
3. Fix /listTasks to match 2 new GSIs
   Tasks GSIs:
   email (HASH) + entryDate (RANGE)
   emailTaskType (HASH) + entryDate (RANGE) --> on 'my activities' + entryDate desc
   status (HASH) + entryDate
   statusTaskType (HASH) + entryDate ---> on app/page and fetch also by entryDate desc

https://wj5af91tc8.execute-api.eu-west-1.amazonaws.com/dev/tasks
?email= -> OK
?status= -> OK
?emailTaskType=operationsolidarity.test1@gmail.com#request ---> fetches all the tasks!!!
?statusTaskType='' ---> ?????
?sortType='asc' --> not working

query

1. Handle statuses -> fetch and update
2. Create User form/Update Preferences Form

### Weekend:

- Multi-language
- Geo location
- Font sizes on the global level
- ML Translation
- "Comments" - open for everyone to update?

## // for a 'volunteer': create page for listing all request and add filter and message capabilities

Routes:
/tasks/ --> sort , filter by city/distance range/availability/ and 'link to update'
/tasks/[id]

/users/
/users/[id]/update-profile

- find me a match -> based on User's Volunteering Profile
- Find styled components + fix reactivity issues
- Multi-language support!!

---

add to menu:
requests
proposals
create request
create proposal
my activity -> requests/proposals tabs

tabs for "my activity" page:
https://tailwindui.com/components/application-ui/navigation/tabs#component-07e889de48dabb9e22d20353d7c02d16

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

## Manual actions when creating the sam template from scratch:

1. grab the new API GW ID
2. grab the new UserPool ID + new App Client Id / Secret
3. set the following env. vars (both on .env and Vercel env.)
   COGNITO_USER_POOL_ID=
   COGNITO_CLIENT_ID=
   COGNITO_CLIENT_SECRET=
   COGNITO_ISSUER=

4. In the new userPool -> Sign-In Experience -> Add Identity Provider --> Google
   4.1 ClientId: 432934400013-dn446snirc1l8356hf13a0iimgqlstsn.apps.googleusercontent.com
   4.2 ClientSecret: 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
   4.3 User pool attributes: email=email phone_number=phoneNumbers picture=picture username=sub (format is attribute=googleAttribute name)

5. In the new userPool --> App Integration --> App Clients
   4.1 Select the new appClient --> update COGNITO_CLIENT_ID and COGNITO_CLIENT_SECRET
   4.2 Review Authentication flows:
   ALLOW_CUSTOM_AUTH
   ALLOW_REFRESH_TOKEN_AUTH
   ALLOW_USER_PASSWORD_AUTH
   ALLOW_USER_SRP_AUTH
   4.3 Update Hosted UI:
   Allowed callback URLs
   http://localhost:3000/api/auth/callback/cognito
   https://operation-solidarity.vercel.app/api/auth/callback/cognito

- Identity Providers:
  Google
- OAuth 2.0 grant types
  Authorization code grant
- OpenID Connect scopes
  Email OpenID

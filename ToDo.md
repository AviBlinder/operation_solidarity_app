########################################################################################
ToDo:

1. add filters functionality and then apply new template
2. update status => directly on the details page (also)
3. Style <TaskDetail>
4. Create 'tasks/[id]' view details page
5. Create User form/Update Preferences Form 4. Landing Page with Hero component 5. Create Userpool + google identity

6. Fix /listTasks to match 2 new GSIs

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

inline filter/sort layout:
https://tailwindui.com/components/ecommerce/components/category-filters

reactive navbar:
https://tailwindui.com/components/application-ui/navigation/navbars#component-aaed25b299f2015d2c4276b98d463cee

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

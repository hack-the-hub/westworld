# Muxer Lambdas

Serverless configured lambdas running on AWS.

---


### First time setup

#### Create a new AWS Profile within `~/.aws/credentials`

For initial setup, please create a `muxer` profile in your
`~/.aws/credentials` file. Serverless will use this when running the commands
listed below.

```
[muxer]
aws_access_key_id = <access-key-id-value>
aws_secret_access_key = <access-key-value>
region=us-east-1
output=json
```

#### Install serverless and login

Run the following commands from this directory. This will install serverless within the lambdas directory and ensure you are logged in to serverless prior to deploying changes to AWS.

```bash
$ npm install
```

> Note: The first time you login you will have to authenticate with Github in the Browser

#### Adds secrets to SSM parameter store

Prior to deploying changes you will need to add secret keys to the [SSM Parameter Store](https://console.aws.amazon.com/systems-manager/parameters/?region=us-east-1); This can be done via the UI or using the following commands (if you have the relevant environemntal variables configured).

This creates the keys and values in the SSM parameter store:

```bash
$ aws ssm put-parameter --name googleCalendarApiToken --region=us-east-1 --type String --value ${GOOGLE_DEVELOPER_KEY}
$ aws ssm put-parameter --name eventbriteApiToken --region=us-east-1 --type String --value ${EVENTBRITE_API_TOKEN}
$ aws ssm put-parameter --name meetupcomApiToken --region=us-east-1 --type String --value ${MEETUP_API_TOKEN}
```

This reads the keys and values from the SSM paramter store to ensure they have been created successfully:

```
$ aws ssm get-parameters --region=us-east-1 --name googleCalendarApiToken eventbriteApiToken meetupcomApiToken
```

#### Install dependencies in each directory

You will need to ensure you have installed the dependencies in the following directories prior to deploying:

* `./lambda`
* `./lambda/eventbrite`
* `./lambda/meetup`
* `./lambda/farsetlabs`


## Meetup.com

Lambdas used to get and process events from Meetup.com. There are helper scripts
to aid in deployment and development. Use `npm run <command>` with any of the
below.

#### `meetupcom:deploy`

Deploy (or redeploy) the lambdas and all associated infrastructure. Do this
when setting up for the first time, or whenever the `serverless.yml` file
changes


### Producer

This lambda pulls data from the Meetup.com API and saves it to S3.

You will need to create a new entry in the AWS Systems Manager Parameter store
for the Meetup.com API token. Make a secure string with the name
`meetupcomApiToken` and the value of your Meetup.com API token. Serverless will
then automatically pull that value into your lambda as an environment variable.

#### `meetupcom:producer:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `meetupcom:producer:invoke`

Invoke the lambda on AWS. As this lambda creates files in S3, you should see new
JSON files created with the data pulled from Meetup.com.

#### `meetupcom:producer:invoke-local`

Invoke the lambda locally. Use this for development. You will need to pass a
Meetup.com API token as an environment variable:

```
MEETUPCOM_API_TOKEN=<token-value> npm run meetupcom:invoke-local
```

The local lambda will also not have permissions to write the files to S3 and you
will receive an "Access Denied" error. Instead you may want to comment out the
`uploadTo` calls whilst in development.

#### `meetupcom:producer:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.


### Transformer

This lambda takes the Meetup.com JSON data which has been saved to S3,
transforms it into a standardised format and saves it back to S3.

This lambda is triggered by the creation of the source file by the producer
lambda.

#### `meetupcom:transform:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `meetupcom:transform:invoke`

Invoke the lambda on AWS. As this lambda is triggered by the creation of files
in the producer bucket, this may not run correctly. It can be invoked by calling
the producer invoke command instead.

#### `meetupcom:transform:invoke-local`

Invoke the lambda locally. Use this for development.

The local lambda will need to be provided with an event object which contains
mock values for the newly created file. Samples of the AWS event objects can be
found at:
https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-s3-put

The local lambda will not have permissions to read / write files to / from S3
and you will receive an "Access Denied" error. Instead you may want to comment
out the `getListFromS3`, `getFromS3` and `uploadTo` calls whilst in development.

#### `meetupcom:transform:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.


---

## Eventbrite

Lambdas used to get and process events from Eventbrite. There are helper scripts
to aid in deployment and development. Use `npm run <command>` with any of the
below.

#### `eventbrite:deploy`

Deploy (or redeploy) the lambdas and all associated infrastructure. Do this
when setting up for the first time, or whenever the `serverless.yml` file
changes


### Producer

This lambda pulls data from the Eventbrite.com API and saves it to S3.

You will need to create a new entry in the AWS Systems Manager Parameter store
for the Eventbrite API token. Make a secure string with the name
`eventbriteApiToken` and the value of your Eventbrite API token. Serverless will
then automatically pull that value into your lambda as an environment variable.

#### `eventbrite:producer:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `eventbrite:producer:invoke`

Invoke the lambda on AWS. As this lambda creates files in S3, you should see new
JSON files created with the data pulled from Eventbrite.

#### `eventbrite:producer:invoke-local`

Invoke the lambda locally. Use this for development. You will need to pass an
Eventbrite API token as an environment variable:

```
EVENTBRITE_API_TOKEN=<token-value> npm run eventbrite:invoke-local
```

The local lambda will also not have permissions to write the files to S3 and you
will receive an "Access Denied" error. Instead you may want to comment out the
`uploadTo` calls whilst in development.

#### `eventbrite:producer:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.


### Transformer

This lambda takes the Eventbrite JSON data which has been saved to S3,
transforms it into a standardised format and saves it back to S3.

This lambda is triggered by the creation of the source file by the producer
lambda.

#### `eventbrite:transform:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `eventbrite:transform:invoke`

Invoke the lambda on AWS. As this lambda is triggered by the creation of files
in the producer bucket, this may not run correctly. It can be invoked by calling
the producer invoke command instead.

#### `eventbrite:transform:invoke-local`

Invoke the lambda locally. Use this for development.

The local lambda will need to be provided with an event object which contains
mock values for the newly created file. Samples of the AWS event objects can be
found at:
https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-s3-put

The local lambda will not have permissions to read / write files to / from S3
and you will receive an "Access Denied" error. Instead you may want to comment
out the `getFromS3` and `uploadTo` calls whilst in development.

#### `eventbrite:transform:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.


---

## Farset Labs Calendar

Lambdas used to get and process events from the Farset Labs calendar. There are
helper scripts to aid in deployment and development. Use `npm run <command>`
with any of the below.

#### `farsetlabs:deploy`

Deploy (or redeploy) the lambdas and all associated infrastructure. Do this
when setting up for the first time, or whenever the `serverless.yml` file
changes


### Producer

This lambda pulls data from the Farset Labs Google calendar JSON endpoint and
saves it to S3.

You will need to create a new entry in the AWS Systems Manager Parameter store
for the Google Calendar API token. Make a secure string with the name
`googleCalendarApiToken` and the value of your Eventbrite API token. Serverless
will then automatically pull that value into your lambda as an environment
variable.

#### `farsetlabs:producer:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `farsetlabs:producer:invoke`

Invoke the lambda on AWS. As this lambda creates files in S3, you should see new
JSON files created with the data pulled from the Farset Labs calendar.

#### `farsetlabs:producer:invoke-local`

Invoke the lambda locally. Use this for development. You will need to pass an
Google Calendar API token as an environment variable:

```
GOOGLE_CALENDAR_API_TOKEN=<token-value> npm run farsetlabs:producer:invoke-local
```

The local lambda will not have permissions to write the files to S3 and you
will receive an "Access Denied" error. Instead you may want to comment out the
`uploadTo` calls whilst in development.

#### `farsetlabs:producer:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.


### Transformer

This lambda takes the Farset Labs Google calendar JSON data which has been
saved to S3, transforms it into a standardised format and saves it back to S3.

This lambda is triggered by the creation of the source file by the producer
lambda.

#### `farsetlabs:transform:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `farsetlabs:transform:invoke`

Invoke the lambda on AWS. As this lambda is triggered by the creation of files
in the producer bucket, this may not run correctly. It can be invoked by calling
the producer invoke command instead.

#### `farsetlabs:transform:invoke-local`

Invoke the lambda locally. Use this for development.

The local lambda will need to be provided with an event object which contains
mock values for the newly created file. Samples of the AWS event objects can be
found at:
https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-s3-put

The local lambda will not have permissions to read / write files to / from S3
and you will receive an "Access Denied" error. Instead you may want to comment
out the `getFromS3` and `uploadTo` calls whilst in development.

#### `farsetlabs:transform:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.

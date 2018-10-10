# Muxer Lambdas

Serverless configured lambdas running on AWS.

---

## Meetup.com

Lambdas used to get and process events from Meetup.com. There are helper scripts
to aid in deployment and development. Use `npm run <command>` with any of the
below.

For initial setup, please create a `meetupcomEvents` profile in your
`~/.aws/credentials` file. Serverless will use this when running the commands
listed below.

```
[meetupcomEvents]
aws_access_key_id = <access-key-id-value>
aws_secret_access_key = <access-key-value>
```

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

Invoke the lambda on AWS. As this lambda created files in S3, you should see new
JSON files created of the data pulled from Meetup.com.

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

---

## Eventbrite

Lambdas used to get and process events from Eventbrite. There are helper scripts
to aid in deployment and development. Use `npm run <command>` with any of the
below.

For initial setup, please create a `eventbriteEvents` profile in your
`~/.aws/credentials` file. Serverless will use this when running the commands
listed below.

```
[eventbriteEvents]
aws_access_key_id = <access-key-id-value>
aws_secret_access_key = <access-key-value>
```

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

Invoke the lambda on AWS. As this lambda created files in S3, you should see new
JSON files created of the data pulled from Eventbrite.

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

---

## Farset Labs Calendar

Lambdas used to get and process events from the Farset Labs calendar. There are
helper scripts to aid in deployment and development. Use `npm run <command>`
with any of the below.

For initial setup, please create a `farsetlabsEvents` profile in your
`~/.aws/credentials` file. Serverless will use this when running the commands
listed below.

```
[farsetlabsEvents]
aws_access_key_id = <access-key-id-value>
aws_secret_access_key = <access-key-value>
```

#### `farsetlabs:deploy`

Deploy (or redeploy) the lambdas and all associated infrastructure. Do this
when setting up for the first time, or whenever the `serverless.yml` file
changes


### Producer

This lambda pulls data from the Farset Labs calendar iCalendar endpoint and
saves it to S3.

The Farset Labs calendar is public. You will not need to set any API tokens to
run this lambda.

#### `farsetlabs:producer:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

#### `farsetlabs:producer:invoke`

Invoke the lambda on AWS. As this lambda created files in S3, you should see new
ICS files created of the data pulled from the Farset Labs calendar.

#### `farsetlabs:producer:invoke-local`

Invoke the lambda locally. Use this for development.

The local lambda will not have permissions to write the files to S3 and you
will receive an "Access Denied" error. Instead you may want to comment out the
`uploadTo` calls whilst in development.

#### `farsetlabs:producer:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.

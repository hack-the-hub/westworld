# Muxer Lambdas

Serverless configured lambdas running on AWS.

---

## Meetup.com

Lambda used to regularly pull events from Meetup.com. There are helper scripts
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

You will also need to create a new entry in the AWS Systems Manager Parameter
store for the Meetup.com API token. Make a secure string with the name
`meetupcomApiToken` and the value of your Meetup.com API token. Serverless will
then automatically pull that value into your lambda as an environment variable.

### `meetupcom:deploy`

Deploy (or redeploy) the lambda and all associated infrastructure. Do this
when setting up for the first time, or whenever the `serverless.yml` file
changes

### `meetupcom:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

### `meetupcom:invoke`

Invoke the lambda on AWS. As this lambda created files in S3, you should see new
JSON files created of the data pulled from Meetup.com.

### `meetupcom:invoke-local`

Invoke the lambda locally. Use this for development. You will need to pass a
Meetup.com API token as an environment variable:

```
MEETUPCOM_API_TOKEN=<token-value> npm run meetupcom:invoke-local
```

The local lambda will also not have permissions to write the files to S3 and you
will receive an "Access Denied" error. Instead you may want to comment out the
`uploadTo` calls whilst in development.

### `meetupcom:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.

---

## Eventbrite

Lambda used to regularly pull events from Eventbrite.com. There are helper scripts
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

You will also need to create a new entry in the AWS Systems Manager Parameter
store for the Eventbrite API token. Make a secure string with the name
`eventbriteApiToken` and the value of your Eventbrite API token. Serverless will
then automatically pull that value into your lambda as an environment variable.

### `eventbrite:deploy`

Deploy (or redeploy) the lambda and all associated infrastructure. Do this
when setting up for the first time, or whenever the `serverless.yml` file
changes

### `eventbrite:update`

Update just the handler functionality. Do then whenever you change the
functionality of the lambda.

### `eventbrite:invoke`

Invoke the lambda on AWS. As this lambda created files in S3, you should see new
JSON files created of the data pulled from Eventbrite.

### `eventbrite:invoke-local`

Invoke the lambda locally. Use this for development. You will need to pass an
Eventbrite API token as an environment variable:

```
EVENTBRITE_API_TOKEN=<token-value> npm run eventbrite:invoke-local
```

The local lambda will also not have permissions to write the files to S3 and you
will receive an "Access Denied" error. Instead you may want to comment out the
`uploadTo` calls whilst in development.

### `eventbrite:logs`

Pulls the logs from cloudwatch of the last lambda run. Useful for debugging.

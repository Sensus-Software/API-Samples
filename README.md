# Sensus BPM Online API Examples

Welcome to the example repository of Sensus BPM Online API. To get access to the API one has to have a valid JWT generated. 
Please refer tot the Sensus BPM Online help for information on generating JWT's.

## Getting started

If you are a Plus customer and have a valid JWT. You only need the GraphQL endpoint. 
This can be easily deduced from your own Designer domain:

Example: if you open the designer at `https://CUSTOMER.sensus-designer.com` then the `ENDPOINT` will be:
`https://CUSTOMER-server.sensus-designer.com/graphql`.

Since this is a GraphQL API the GraphQL spec is followed and being served over HTTPS:
https://graphql.org/learn/serving-over-http/

We allow GET and POST request, however POST request are preferable.

## Making your first request

If you have your `JWT` and your `ENDPOINT` you can make your first POST-request with the following information to the `ENDPOINT`:

*Headers*
- `Authorization: Bearer JWT`
- `Content-Type: application/json`
- `Accept: application/json`

*Body*
```json
{
  "operationName": null, 
  "variables": {}, 
  "query": "{ \n currentUser { \n email \n } \n }"
}
```

This will result in something similar to:

```json
{
  "data": {
    "currentUser": {
      "email": "service-user-eeca2e93-8b46-4f11-8205-e8c3e236f79f@sensus-processmanagement.com"
    }
  }
}
```

## Examples

All the examples are in JS and can be run from the command-line with Node.js. 
Only the `node-fetch` module is used, so be sure to run `npm install` before running any example. 
The configuration is stored in a file called `config.js`. An example is placed in `config.example.js`. 
Please rename that file to`config.js` and put in your own variables for the examples.
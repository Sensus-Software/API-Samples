import { request } from './util.js'

/* This example will get you the current user */

const query = `
{
  currentUser {
    email
  }
}
`

request(query, {}).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output:
{
  data: {
    currentUser: {
      email: 'service-user-ecb2b6e2-8dc8-4f5f-a6d8-d5f5e5524408@sensus-processmanagement.com'
    }
  }
} */
import { request } from './util.js'

/* This example will get you all the available licenses */

const query = `
{
  licenses {
    guid
    name
  }
}
`

request(query, {}).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output:
{
  "data": {
    "licenses": [
      {
        "guid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992",
        "name": "ACME Corp"
      }
    ]
  }
} */
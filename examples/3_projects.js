import { request } from './util.js'

/*
This example will list you the projects. Please note this is the first example with variables and a named query.
 */

const query = `
query Projects($licenseGuid: UUID!) {
  licenseByGuid(guid: $licenseGuid) {
    projects {
      guid
      name
    }
  }
}
`

const variables = {
    "licenseGuid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992"
}


request(query, variables).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output:
{
  "data": {
    "licenseByGuid": {
      "projects": [
        {
          "guid": "b811d50a-0cae-4ed9-8f4c-0c59b44cd07a",
          "name": "ISO 27001 Sensus process management"
        },
        {
          "guid": "5e913995-b0aa-4f6a-4acd-246c534d1003",
          "name": "Demo project"
        }
      ]
    }
  }
} */
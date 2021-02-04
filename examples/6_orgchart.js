import { request } from './util.js'

/* In this example the full OrgChart will be retrieved. Since it can have infinite levels, it is retrieved as a flattened structure */

const orgChartQuery = `
query OrgChart($licenseGuid: UUID!, $projectGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    concept {
      orgchart {
        flattened {
          guid
          name
          totalSequence
          parentGuid
        }
      }
    }
  }
}
`

const variables = {
    "licenseGuid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992",
    "projectGuid": "5e913995-b0aa-4f6a-4acd-246c534d1003"
}


console.log("Get full flattened tree")
await request(orgChartQuery, variables).then(json => console.log(JSON.stringify(json, null, "  ")))
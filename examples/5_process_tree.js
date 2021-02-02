import { request } from './util.js'

/*
In this example the full process tree will be retrieved, both in a hierarchical way as a flattened way
 */

const queryProcessTree = `
query ProcessTree($licenseGuid: UUID!, $projectGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    concept {
      processes {
        organisations { 
          guid totalSequence name
          themes {
            guid totalSequence name
            mainProcesses {
              guid totalSequence name
              processes {
                guid totalSequence name
                activities {
                  guid totalSequence name type
                }
              }
            }
          }
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


console.log("Get full hierarchical tree")
await request(queryProcessTree, variables).then(json => console.log(JSON.stringify(json, null, "  ")))

const queryFlattened = `
query ProcessTree($licenseGuid: UUID!, $projectGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    concept {
      processes {
        flattened(includingActivities: true) {
          guid totalSequence name type parentGuid
        }
      }
    }
  }
}`

console.log("Get full flattened tree")
await request(queryFlattened, variables).then(json => console.log(JSON.stringify(json, null, "  ")))


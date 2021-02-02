import { request } from './util.js'

/*
This example will list the different versions of a project and show how to always fetch the latest definitive or concept.
 */

const queryAllVersions = `
query Versions($licenseGuid: UUID!, $projectGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    versions {
      guid
      version
      state
      finalizeDate
    }
  }
}
`

const variables = {
    "licenseGuid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992",
    "projectGuid": "5e913995-b0aa-4f6a-4acd-246c534d1003"
}


console.log("First show all the versions in a project")
await request(queryAllVersions, variables).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output:
{
  "data": {
    "project": {
      "versions": [
        {
          "guid": "0a3401ed-f240-a822-761c-7e2d8623c0d5",
          "version": "",
          "state": "CONCEPT",
          "finalizeDate": null
        },
        {
          "guid": "2be7324a-959a-4f68-820a-6ae29e9de44d",
          "version": "1.0",
          "state": "OLD",
          "finalizeDate": "2020-06-30 11:16:09.0"
        },
        {
          "guid": "8838f23a-4111-4ede-bf1c-dc8e50cd365a",
          "version": "2.0",
          "state": "DEFINITIVE",
          "finalizeDate": "2020-06-30 11:18:39.0"
        }
      ]
    }
  }
}
*/

const querySpecificVersion = `
query Specific($licenseGuid: UUID!, $projectGuid: UUID!, $projectVersionGuid: UUID!) {
  projectVersion(licenseGuid: $licenseGuid, projectGuid: $projectGuid, projectVersionGuid: $projectVersionGuid) {
    guid
    version
    state
  }
}`

console.log("Get a specific version")
await request(querySpecificVersion, {...variables, projectVersionGuid: "2be7324a-959a-4f68-820a-6ae29e9de44d"})
    .then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output:
{
  "data": {
    "projectVersion": {
      "guid": "2be7324a-959a-4f68-820a-6ae29e9de44d",
      "version": "1.0",
      "state": "OLD"
    }
  }
}
 */

const queryConceptVersion = `
query Concept($licenseGuid: UUID!, $projectGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    concept {
      guid
      version
      state
    }
  }
}`

console.log("Get a concept version")
await request(queryConceptVersion, variables).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output
{
  "data": {
    "project": {
      "concept": {
        "guid": "0a3401ed-f240-a822-761c-7e2d8623c0d5",
        "version": "",
        "state": "CONCEPT"
      }
    }
  }
}
 */

const queryDefinitiveVersion = `
query Definitive($licenseGuid: UUID!, $projectGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    definitive {
      guid
      version
      state
    }
  }
}`

console.log("Get a definitive version")
await request(queryDefinitiveVersion, variables).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output
{
  "data": {
    "project": {
      "definitive": {
        "guid": "8838f23a-4111-4ede-bf1c-dc8e50cd365a",
        "version": "2.0",
        "state": "DEFINITIVE"
      }
    }
  }
}
 */
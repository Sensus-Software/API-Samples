import { request } from './util.js'

/*
Every entity is described by a GUID. However, when a concept project version is finalized in the new finalized version
the guids are all different from those in the concept. This is to retain uniqueness between versions. However, they still
contain an immutableGuid field, which is constant through versions.

It is possible to fetch an icon both by guid and by immutable guid, which will be shown here.

Important: There is no guarantee that immutableGuid and Guid are the same in the concept version.
 */

const query = `
query Guids($licenseGuid: UUID!, $projectGuid: UUID!, $iconGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    concept {
      iconsByGuid(guids: [$iconGuid], immutable: true) {
        guid
        immutableGuid
        name
      }
    }
    
    definitive {
      iconsByGuid(guids: [$iconGuid], immutable: true) {
        guid
        immutableGuid
        name
      }
    }
  }
}`

const variables = {
    "licenseGuid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992",
    "projectGuid": "5e913995-b0aa-4f6a-4acd-246c534d1003",
    "iconGuid": "08296049-a813-705b-76cc-2c2a130a391f"
}


console.log("Get concept and definitive icon by immutable guid")
await request(query, variables).then(json => console.log(JSON.stringify(json, null, "  ")))

/* Expected output:
{
  "data": {
    "project": {
      "concept": {
        "iconsByGuid": [
          {
            "guid": "08296049-a813-705b-76cc-2c2a130a391f",
            "immutableGuid": "08296049-a813-705b-76cc-2c2a130a391f",
            "name": "Rocket Launch Preparations"
          }
        ]
      },
      "definitive": {
        "iconsByGuid": [
          {
            "guid": "33bf1ef3-26a3-4332-ae42-826cd40184cf",
            "immutableGuid": "08296049-a813-705b-76cc-2c2a130a391f",
            "name": "Rocket Launch Preparations"
          }
        ]
      }
    }
  }
}
*/
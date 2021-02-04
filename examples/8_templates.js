import { request } from './util.js'

/*
In this example we will retrieve template information. Template information is polymorphic, which means checks need to be done
on the types to get the actual data. It is possible to filter on template types, but for this example we will fetch all templates
for a process and the values.
 */

const query = `
query Templates($licenseGuid: UUID!, $projectGuid: UUID!, $iconGuid: UUID!) {
  project(licenseGuid: $licenseGuid, projectGuid:$projectGuid) {
    concept {
      iconsByGuid(guids: [$iconGuid], immutable: true) {
        name
        templates {
          field {
            name
            type
          }
          
          values {
            ...on TemplateTextValue {
              text
            }
            
            ...on TemplateFunctionValue {
              function {
                name
                department {
                  name
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
    "projectGuid": "5e913995-b0aa-4f6a-4acd-246c534d1003",
    "iconGuid": "08296049-a813-705b-76cc-2c2a130a391f"
}


console.log("Get templates of a process")
await request(query, variables).then(json => console.log(JSON.stringify(json, null, "  ")))
import {request} from "./util.js";

/*
In this example, a new categegorygroup is added to a category.
The response contains the guid of the added category.
 */
const query = `mutation myMutation($licenseGuid:UUID!, $projectGuid:UUID!, $categoryGuid:UUID!
    projectVersion(licenseGuid:$licenseGuid, projectGuid:$projectGuid, state:CONCEPT) {

        addCategoryGroup(categoryGuid:$categoryGuid, name:"new group name") {
            guid,
            name
        }
    }
}`

const variables = {
    "licenseGuid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992",
    "projectGuid": "5e913995-b0aa-4f6a-4acd-246c534d1003",
    "categoryGuid": "08296049-a813-705b-76cc-2c2a130a391f"
}
await request(query, variables).then(json => console.log(JSON.stringify(json, null, "  ")))
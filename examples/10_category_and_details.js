import { request } from './util.js'

/*
Sometimes it is more convenient to request the desired guids
with a first request and the desired details in a second request.
To avoid requesting a lot of data unnecessarily, for example.

This example first retrieves the categories of a project
and then requests the details of 1 category (filtered by name in this case).
 */

/* replace with your own license and project guid */
const licenseGuid = "206e2314-ebeb-4c1e-884e-db7fd2a312fb";
const projectGuid= "fab4b710-6f31-4add-9787-b879b7088197";

const queryProject = `
    query($licenseGuid: UUID!, $projectGuid: UUID!) {
        projectVersion(
            licenseGuid: $licenseGuid
            projectGuid: $projectGuid
            state: CONCEPT) {
            categories {
                type
                guid
                name
                groupColor
            }
        }
    }
`;

const queryCategory = `
    query getRiskItems($licenseGuid: UUID!, $projectGuid: UUID!, $riskCategoryGuid:UUID) {
        projectVersion(
            licenseGuid: $licenseGuid
            projectGuid: $projectGuid
            state: CONCEPT) {
        categoriesByGuid(guids: [$riskCategoryGuid]) {
             ... on GenericCategory {
                 flattened {
                      ... on CategoryGroup {
                        type
                        guid
                        name
                        totalSequence
                      }
                      ... on CategoryItem {
                        type
                        guid
                        name
                        totalSequence
                      }
                    }
                 }
             }
        }
    }
`;


/**
 * Get the Risk category
 * @returns {Promise<string>} The guid of the Risk category
 */
async function getRiskCategory() {
    const queryVars = {
        licenseGuid: licenseGuid,
        projectGuid: projectGuid,
    }
    const projectResponse = await request(queryProject, queryVars);
    if (projectResponse.errors) {
        console.error(
            'Error with the request:',
            JSON.stringify(projectResponse.errors[0].message, null, 2)
        );
        return;
    }
    // Assuming category is found
    const cats = projectResponse.data.projectVersion.categories;
    const riskCategory = cats.find(cat => cat.name === "Risk");
    console.log(riskCategory.name + ": guid = " + riskCategory.guid);
    return riskCategory.guid;
}

/**
 * Get the Risk details
 * @param {string} riskCategoryGuid The guid of the Risk category
 * @returns {Promise<object>} The risk details
 */
async function getRiskDetails(riskCategoryGuid) {
    const queryVars = {
        licenseGuid: licenseGuid,
        projectGuid: projectGuid,
        riskCategoryGuid:  riskCategoryGuid
    }
    const categoryResponse = await request(queryCategory, queryVars);
    if (categoryResponse.errors) {
        console.error(
            'Error with the request:',
            JSON.stringify(categoryReponse.errors[0].message, null, 2)
        );
        return;
    }
    return categoryResponse.data.projectVersion.categoriesByGuid[0].flattened;
}


// Main function
async function runQueries() {
    try {
        // First query to get a project
        const riskCategoryGuid = await getRiskCategory();
        if (!riskCategoryGuid) {
            console.error("Risk category not found");
            return;
        }

        const riskDetails = await getRiskDetails(riskCategoryGuid);
        if (!riskDetails) {
            console.error("Risk details not found");
            return;
        }
        console.log(JSON.stringify(riskDetails, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

runQueries();
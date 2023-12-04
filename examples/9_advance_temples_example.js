import {request} from "./util.js";

/*
More advanced example of requesting templates.
This example handles all template types including composed values.
*/

const query = `fragment parseComposedValues on TemplateValue {
  ... on TemplateComposedValue {
    left {
      name
      type
      values {
        ...parseTemplates
      }
    }
    right {
      name
      type
      values {
        ...parseTemplates
      }
    }
  }
}

fragment parseTemplates on TemplateValue {
  ... on TemplateTextValue {
    text
  }
  ... on TemplateNumberValue {
    number
  }
  ... on TemplateURLListValue {
    choices {
      label
      selected
      url
    }
  }
  ... on TemplateIndicatorValue {
    items {
      label
      text
    }
  }
  ... on TemplateBooleanValue {
    choices {
      label
      selected
    }
  }
  ... on TemplateMultipleChoiceValue {
    choices {
      label
      selected
    }
  }
  ... on TemplateFunctionValue {
    function {
      name
      guid
      sequence
      type
      publisherUrl
      ...description
      department {
        guid
        name
        sequence
        publisherUrl
      }
    }
  }
  ... on TemplateImageValue {
    resource {
      guid
      urlPath
      mimeType
    }
  }
  ... on TemplateApplicationValue {
    application {
      name
      guid
      publisherUrl
      ...description
      type
      group {
        name
        guid
        publisherUrl
      }
    }
  }
  ... on TemplateRoleValue {
    role {
      guid
      name
      publisherUrl
      ...description
      type
      group {
        name
        guid
        publisherUrl
      }
    }
  }
  ... on TemplateDocumentValue {
    document {
      name
      guid
      publisherUrl
      type
      ...description
      group {
        name
        guid
        publisherUrl
      }
    }
  }
  ... on TemplateCustomCategoryValue {
    item {
      name
      guid
      publisherUrl
      ...description
      group {
        name
        guid
        publisherUrl
      }
    }
  }
}

fragment description on Icon {
  description: templates(filter: {systemTypes: [Description]}) {
    guid
    name
    type
    values {
      ... on TemplateTextValue {
        text
      }
    }
  }
}

query getTemplateFieldsByGuids($licenseGuid: UUID!, $projectGuid: UUID!, $iconGuids: [UUID]!) {
  project(licenseGuid: $licenseGuid, projectGuid: $projectGuid) {
    concept {
      iconsByGuid(guids: $iconGuids, immutable: false) {
        name
        guid
        immutableGuid
        ... on CategoryItem {
          linkedIcons {
            guid
            name
            type
            totalSequence
            ...description
          }
        }
        ... on Function {
          linkedIcons {
            guid
            name
            type
            totalSequence
            ...description
          }
        }
        templates {
          name
          type
          values {
            ...parseTemplates
            ...parseComposedValues
            ... on TemplateLabeledValue {
              items {
                label
                value {
                  type
                  values {
                    ...parseTemplates
                  }
                }
              }
            }
            ... on TemplateDocumentValue {
              document {
                guid
                name
                templates {
                  guid
                  name
                  type
                  values {
                    ...parseTemplates
                    ...parseComposedValues
                  }
                }
              }
            }
            ... on TemplateApplicationValue {
              application {
                guid
                name
                publisherUrl
                templates {
                  guid
                  name
                  type
                  values {
                    ...parseTemplates
                    ...parseComposedValues
                  }
                }
              }
            }
            ... on TemplateCustomCategoryValue {
              item {
                name
                guid
                totalSequence
                publisherUrl
                category {
                  guid
                  icon {
                    base64
                    mimeType
                  }
                  name
                }
              }
              specific {
                name
                type
                values {
                  ...parseTemplates
                  ...parseComposedValues
                }
              }
            }
          }
        }
      }
    }
  }
}`


const variables = {
    "licenseGuid": "5bbe67c3-7dff-469c-9ab2-a4b6ac066992",
    "projectGuid": "5e913995-b0aa-4f6a-4acd-246c534d1003",
    "iconGuids": ["08296049-a813-705b-76cc-2c2a130a391f"]
}


console.log("Get templates of a process")
await request(query, variables).then(json => console.log(JSON.stringify(json, null, "  ")))
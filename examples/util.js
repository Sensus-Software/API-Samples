import fetch from 'node-fetch'
import config from "../config.js"

export const request = (query, variables) => {
    const body = {
        query,
        variables
    }

    return fetch(config.endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.jwt}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
}
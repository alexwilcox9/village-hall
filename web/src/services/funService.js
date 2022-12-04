import { fetchConfig } from "./dataService";

/**
 * Returns wordnik word of the day
 * @param {*} success 
 */
export const fetchWordOfTheDay = (success) => {

    fetchConfig( (config) => {
        let apiKey = "";
        if (config.wordApiKey !== undefined) {
            apiKey = config.wordApiKey;
        } else {
            console.error("wordApiKey doesn't exist in config");
        }

        fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${apiKey}`)
        .then(function(response) {
            if (response.status >= 400) {
                console.error("Word of the day doesn't work anymore. Call the developer and tell him to take it out");
                return {};
            }
            return response.json();
        })
        .then(function(json) {
            success(json);
        })
    })

}
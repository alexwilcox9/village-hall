/**
 * This method will fetch the site contacts from public/data/contacts.json
 * 
 * @param {function} success the success function
 */
export const fetchContacts = (success) => {
    fetchFile('contacts', success);
}

export const fetchConfig  = (success) => {
    fetchFile('config', success);
}

/**
 * This method will fetch the hall users from public/data/hallUsers.json
 * 
 * @param {function} success the success function
 */
export const fetchUsers = (success) => {
    fetchFile('hallUsers', success);
}

/**
 * This method will fetch the image urls from public/data/images.json
 * 
 * @param {function} success the success callback
 */
export const fetchImageUrls = (success) => {
    fetchFile('images', success);
}

/**
 * 
 * @param {*} filename the name of the json file you're after
 * @param {*} success success callback
 */
const fetchFile = (filename, success) => {
    fetch(`${process.env.PUBLIC_URL}/data/${filename}.json`)
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
    })
    .then(function(json) {
        success(json);
    })
}
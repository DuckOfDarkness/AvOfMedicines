const availabilitiesBaseUrl = `http://localhost:3000/api/wholesaler_medicines`

export function getAvailabilitiesApiCall(){
    const promise = fetch(availabilitiesBaseUrl)
    return promise
}

export function getAvailabilitiesByIdApiCall(availabilityId) {
    const url = `${availabilitiesBaseUrl}/${availabilityId}`;
    const promise = fetch(url)
    return promise;
}
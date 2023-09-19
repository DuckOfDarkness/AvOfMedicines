import {getCurrentUser} from "../../helpers/authHelper";

const wholesalersBaseUrl = `http://localhost:3000/api/wholesaler`

export function getWholesalerApiCall(){
    const promise = fetch(wholesalersBaseUrl);
    return promise;
}

export function getWholesalerByIdApiCall(wholeID) {
    const url = `${wholesalersBaseUrl}/${wholeID}`;
    const promise = fetch(url)
    return promise;
}

export async function addWholesalerApiCall(whole) {
    const wholeString = JSON.stringify(whole)
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: wholeString
    }
    const promise = fetch(wholesalersBaseUrl, options);
    return promise;
}

export function updateWholesalerApiCall(wholeId, whole){
    const url = `${wholesalersBaseUrl}/${wholeId}`
    const wholeString = JSON.stringify(whole)
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const option = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: wholeString
    }
    const promise = fetch(url, option);
    return promise;
}

export function deleteWholesalerApicall(wholeId){
    const url = `${wholesalersBaseUrl}/${wholeId}`;
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const option = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, option)
    return promise;
}
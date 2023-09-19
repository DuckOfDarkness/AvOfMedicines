import {getCurrentUser} from "../../helpers/authHelper";

const userBaseUrl = `http://localhost:3000/api/login`

export function getUserApiCall(){
    return fetch(userBaseUrl);
}


export function getUserByIdApiCall(usrId) {
    const url = `${userBaseUrl}/${usrId}`;
    const promise = fetch(url)
    return promise;
}

export async function addUserApiCall(usrId) {
    console.log("prod: "+usrId)
    const userString = JSON.stringify(usrId)
    console.log("prodString:"+userString)
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
        body: userString
    }
    const promise = fetch(userBaseUrl, options);
    return promise;
}

export function updateUserApiCall(usrId, usr){
    const url = `${userBaseUrl}/${usrId}`
    const prodString = JSON.stringify(usr)
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
        body: prodString
    }
    const promise = fetch(url, option);
    return promise;
}

export function deleteUserApicall(usrId){
    const url = `${userBaseUrl}/${usrId}`;
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const option = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }
    const promise = fetch(url, option)
    return promise;
}
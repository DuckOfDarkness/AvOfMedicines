import {getCurrentUser} from "../../helpers/authHelper";
const producersBaseUrl = `http://localhost:3000/api/producer`

export function getProducerApiCall(){
    const promise = fetch(producersBaseUrl)
    return promise;
}


export function getProducerByIdApiCall(prodId) {
    const url = `${producersBaseUrl}/${prodId}`;
    const promise = fetch(url)
    return promise;
}

export async function addProducerApiCall(prod) {
    console.log("prod: "+prod)
    const prodString = JSON.stringify(prod)
    console.log("prodString:"+prodString)
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
        body: prodString
    }
    const promise = fetch(producersBaseUrl, options);
    return promise;
}

export function updateProducerApiCall(prodId, prod){
    const url = `${producersBaseUrl}/${prodId}`
    const prodString = JSON.stringify(prod)
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

export function deleteProducerApicall(prodId){
    const url = `${producersBaseUrl}/${prodId}`;
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
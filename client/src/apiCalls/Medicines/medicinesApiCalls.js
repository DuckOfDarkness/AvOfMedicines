import {getCurrentUser} from "../../helpers/authHelper";

const medicinesesBaseUrl = 'http://localhost:3000/api/medicines'

export function getMedicinesApiCall(){
    return fetch(medicinesesBaseUrl);
}

export function getMedicinesByIdApiCall(medId) {
    const url = `${medicinesesBaseUrl}/${medId}`;
    const promise = fetch(url)
    return promise;
}

export function addMedicinesApiCall(med) {
    console.log("prod: "+med)
    const medString = JSON.stringify(med)
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
        body: medString
    }
    const promise = fetch(medicinesesBaseUrl, options);
    return promise;
}

export function updateMedicinesApiCall(medId, med){
    const url = `${medicinesesBaseUrl}/${medId}`
    const medString = JSON.stringify(med)
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
        body: medString
    }
    const promise = fetch(url, option);
    return promise;
}

export function deleteMedicinesApicall(medId){
    const url = `${medicinesesBaseUrl}/${medId}`;
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
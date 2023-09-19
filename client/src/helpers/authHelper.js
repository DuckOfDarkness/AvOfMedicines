const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);


export function getCurrentUser() {
    let userJSON
    const user = localStorage.getItem('user')
    try {
        userJSON = JSON.parse(user)
    } catch (e) {
        return undefined
    }
    return userJSON
}

export function isAuthenticated() {
    const user = getCurrentUser()
    if(user) {
        return true
    }
    return false
}

export function getUserName(){
    const user = getCurrentUser()
}

export function hashPassword(passPlain) {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

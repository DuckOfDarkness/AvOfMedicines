
export function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++)
        inputs[i].classList.remove("error-input");

    for (let i = 0; i < errorTexts.length; i++)
        errorTexts[i].innerText = "";

    errorInfo.innerText = "";
}

// export function checkRequired(value) {
//     if (!value) {
//         return false;
//     }
//     if (value === "-- Wybierz z listy --") {
//         return false;
//     }
//     value = value.toString().trim();
//     return value !== "";
// }
export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    if (value === "0") {
        return false;
    }
    return true;
}


export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max) {
        return false;
    }
    return !(min && length < min);
}

export function checkNumberRange(number, min, max) {
    return !(number < min || number > max);
}

export function checkIfTheNumberIsNegative(number) {
    return number < 0;
}

/**
 * The function checks whether the given string contains only numbers or only letters.
 * @param onlyWhat takes the value: "numbers" or "letters".
 * @param value represents the strings being checked
 */
export function checkIfItContainsOnly(onlyWhat, value) {
    if (!value) {
        return false;
    }
    if (onlyWhat === "numbers") {
        if (isNaN(value)) {
            return false;
        }
    } else if (onlyWhat === "letters") {
        value = value.toString().trim();
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) < 65 ||
                (value.charCodeAt(i) > 90 && value.charCodeAt(i) < 97) ||
                value.charCodeAt(i) > 122) {
                return false;
            }
        }
    }
    return true;
}

export function checkCorrectCountry(value) {

    // if (!((/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(value)))) {
    //     return true
    // }
    if(((/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(value)))) {
        return false
    }else{
        if(((/^[A-Z][a-z]+$/.test(value)))){
            return false
        }else {
            return true
        }
    }
}

export function checkThatItStartsWithACapitalLetter(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    return value.charCodeAt(0) > 64 && value.charCodeAt(0) < 91;
}

export function checkDateFormat(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

/**
 * Function checks if given date is earlier/equal or later/equal to current date.
 * @param inPlaceOf_ takes the value "earlier" or "later".
 * @param value represent the date being checked.
 */
export function checkThatDateIs_ThanTheCurrent(inPlaceOf_, value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }

    let valueDate = new Date(value);
    let currentDate = new Date(Date.now());
    /**
     * Year multiplied by 10000 and month multiplied by 100
     * to represent the full date in one number (e.g. 20221125 for 2022-11-25).
     */
    valueDate = valueDate.getFullYear() * 10000 + valueDate.getMonth() * 100 + valueDate.getDate();
    currentDate = currentDate.getFullYear() * 10000 + currentDate.getMonth() * 100 + currentDate.getDate();
    if (inPlaceOf_ === "earlier") {
        return valueDate < currentDate;
    } else if (inPlaceOf_ === "later") {
        return valueDate > currentDate;
    }
}

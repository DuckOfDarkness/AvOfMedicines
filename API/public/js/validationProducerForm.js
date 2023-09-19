
const nameInput = document.getElementById('name');
const countryInput = document.getElementById('country');

const errorName = document.getElementById('errorName');
const errorCountry = document.getElementById('errorCountry');

const errorsSummary = document.getElementById("errorsSummary");

let valid = true;

function validateForm() {
    resetErrors([nameInput, countryInput], [errorName, errorCountry], errorsSummary);

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa nie moze być pusta.";
    } else if (!checkTextLengthRange(nameInput.value, 2, 100)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa musi zawierać od 2 do 100 znaków.";
    } else if (checkIfItContainsOnly("numbers", nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa nie może zawierać samych cyfr.";
    } else if (!checkThatItStartsWithACapitalLetter(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa musi zaczynać się z dużej litery.";
    }

    if (!checkRequired(countryInput.value)) {
        valid = false;
        countryInput.classList.add("error-input");
        errorCountry.innerText = "Kraj pochodzenia nie moze być pusty.";
        }else if(!checkTextLengthRange(countryInput.value, 2, 100)){
            valid = false;
            countryInput.classList.add("error-input");
            errorCountry.innerText = "Kraj pochodzenia musi zawierać od 2 do 100 znaków.";
        }else if(!checkThatItStartsWithACapitalLetter(countryInput.value)){
            valid = false;
            countryInput.classList.add("error-input");
            errorCountry.innerText = "Kraj pochodzenia musi zaczynać się z dużej litery.";
        }else if(!checkIfItContainsOnly("letters", countryInput.value)){
            valid = false;
            countryInput.classList.add("error-input");
            errorCountry.innerText = "Kraj pochodzenia musi składać się wyłączie z liter.";
        }

    if(!valid){
        errorsSummary.innerText = "Formularz został błędnie wypełniony.";
    }

    return valid;
}
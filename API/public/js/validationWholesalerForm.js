const nameInput = document.getElementById('name');
const nipInput = document.getElementById('nip');

const errorName = document.getElementById('errorName');
const errorNIP = document.getElementById('errorNIP');

const errorsSummary = document.getElementById("errorsSummary");

let valid = true;

function validateForm() {
    resetErrors([nameInput, nipInput], [errorName, errorNIP], errorsSummary);

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa nie moze być pusta.";
    } else if (!checkTextLengthRange(nameInput.value, 2, 70)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa musi zawierać od 2 do 70 znaków.";
    } else if (checkIfItContainsOnly("numbers", nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa nie może zawierać samych cyfr.";
    } else if (!checkThatItStartsWithACapitalLetter(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa musi zaczynać się z dużej litery.";
    }

    if (!checkRequired(nipInput.value)) {
        valid = false;
        nipInput.classList.add("error-input");
        errorNIP.innerText = "Numer NIP nie moze być pusty.";
    } else if (!checkTextLengthRange(nipInput.value, 10, 10)) {
        valid = false;
        nipInput.classList.add("error-input");
        errorNIP.innerText = "Numer NIP musi składać się z 10 cyfr.";
    } else if (!checkIfItContainsOnly("numbers", nipInput.value)) {
        valid = false;
        nipInput.classList.add("error-input");
        errorNIP.innerText = "Numer NIP musi składać się wyłączie z cyfr.";
    }else if(checkIfTheNumberIsNegative(nipInput.value)){
        valid = false;
        nipInput.classList.add("error-input");
        errorNIP.innerText = "Numer NIP nie może być liczbą ujemną.";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz został błędnie wypełniony.";
    }

    return valid;
}
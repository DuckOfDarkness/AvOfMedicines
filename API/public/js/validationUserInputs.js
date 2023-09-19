
const nameInput = document.getElementById('name');
const oldPasswdInput = document.getElementById('oldPasswd');
const newPasswordInput = document.getElementById('newPassword');
const repPasswordInput = document.getElementById('repPassword');

const errorName = document.getElementById('errorName');
const errorOldPasswd = document.getElementById("errorOldPasswd");
const errorNewPasswd = document.getElementById("errorNewPasswd");
const errorRepPassword = document.getElementById("errorRepPassword");

const errorsSummary = document.getElementById("errorsSummary");


let valid = true;

function validateForm() {
     resetErrors([nameInput, oldPasswdInput, newPasswordInput, repPasswordInput], [errorName, errorOldPasswd, errorRepPassword, errorNewPasswd],
         errorsSummary);

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa nie moze być pusta";
    } else if (!checkTextLengthRange(nameInput.value, 2, 90)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa musi zawierać od 2 do 90 znaków.";
    }else if(checkIfItContainsOnly("numbers" ,nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa nie może zawierać samych cyfr.";
    }else if(!checkThatItStartsWithACapitalLetter(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Nazwa musi zaczynać się z dużej litery.";
    }

    if(checkRequired(parallel_importerInput.value)){
        if(!checkTextLengthRange(parallel_importerInput.value, 2, 100)){
            valid = false;
            parallel_importerInput.classList.add("error-input");
            errorParallel_importer.innerText = "Importer równoległy może być pusty lub zawierać od 2 do 100 znaków.";
        }else if(checkIfItContainsOnly("numbers", parallel_importerInput.value)){
            valid = false;
            parallel_importerInput.classList.add("error-input");
            errorParallel_importer.innerText = "Importer równoległy nie może zawierać samych cyfr.";
        }else if(!checkThatItStartsWithACapitalLetter(parallel_importerInput.value)){
            valid = false;
            parallel_importerInput.classList.add("error-input");
            errorParallel_importer.innerText = "Importer równoległy musi zaczynać się z dużej litery.";
        }
    }

    if(!valid){
        errorsSummary.innerText = "Formularz został błędnie wypełniony.";
    }

    return valid;
}
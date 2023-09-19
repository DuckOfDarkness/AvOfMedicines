const nameInput = document.getElementById('name');
const parallel_importerInput = document.getElementById('parallel_importer');
const expiration_dateInput = document.getElementById('expiration_date');
const producerInput = document.getElementById("producer");

const errorName = document.getElementById('errorName');
const errorParallel_importer = document.getElementById('errorParallel_importer');
const errorExpiration_date = document.getElementById('errorExpiration_date');
const errorProducer = document.getElementById('errorProducer');

const errorsSummary = document.getElementById("errorsSummary");

let valid = true;

function validateForm() {
     resetErrors([nameInput, parallel_importerInput, expiration_dateInput, producerInput], [errorName, errorParallel_importer, errorExpiration_date, errorProducer],
         errorsSummary);

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const nameLength = document.getElementById('errorMessage-length').innerText;
    const nameNumberContain = document.getElementById('errorMessage-number_contain').innerText;
    const nameCapitalLetter = document.getElementById('errorMessage-capital_letter').innerText;

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

    const parallel_importerLength = document.getElementById('errorMessage-length').innerText;
    const parallel_importerNumberContain = document.getElementById('errorMessage-number_contain').innerText;
    const parallel_importerCapitalLetter = document.getElementById('errorMessage-capital_letter').innerText;

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

    const dateReqMessage = document.getElementById('errorMessage-required').innerText;
    const dateInvalidFormat = document.getElementById('errorMessage-invalidDateFormat').innerText;
    const dateInvalidPeriod = document.getElementById('errorMessage-invalidDatePeriod').innerText;

    if(!checkRequired(expiration_dateInput.value)){
        valid = false;
        expiration_dateInput.classList.add("error-input");
        errorExpiration_date.innerText = "Data nie może być pusta.";
    }else if(!checkDateFormat(expiration_dateInput.value)){
        valid = false;
        expiration_dateInput.classList.add("error-input");
        errorExpiration_date.innerText = "Wprowadzono błędny format daty. Data powinna być w formacie dd.MM.rrrrr (np. 02.11.2023).";
    }else if(checkThatDateIs_ThanTheCurrent("earlier", expiration_dateInput.value)){
        valid = false;
        expiration_dateInput.classList.add("error-input");
        errorExpiration_date.innerText = "Data ważności nie może być wcześniejsza niż aktualna.";
    }

    const producerReqMessage = document.getElementById('errorMessage-producer-required').innerText;

    if(!checkRequired(producerInput.value)){
        valid = false;
        producerInput.classList.add("error-input");
        errorProducer.innerText = "Nie wybrano producenta.";
    }

    const summary = document.getElementById('errors-Summary').innerText;
    if(!valid){
        errorsSummary.innerText = "Formularz został błędnie wypełniony.";
    }

    return valid;
}
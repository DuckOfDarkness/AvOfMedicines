const medicinesInput = document.getElementById('medicines');
const wholesalerInput = document.getElementById('wholesaler');
const amountInput = document.getElementById('amount');
const dateOfPurchaseInput = document.getElementById('dateOfPurchase');

const errorMedicines = document.getElementById('errorMedicines');
const errorWholesaler = document.getElementById('errorWholesaler');
const errorAmount = document.getElementById('errorAmount');
const errorDateOfPurchase = document.getElementById('errorDateOfPurchase');

const errorsSummary = document.getElementById("errorsSummary");

let valid = true;

function validateForm() {
    resetErrors([medicinesInput, wholesalerInput, amountInput, dateOfPurchaseInput],
        [errorMedicines, errorWholesaler, errorAmount, errorDateOfPurchase], errorsSummary);

    if (!checkRequired(medicinesInput.value)) {
        valid = false;
        medicinesInput.classList.add("error-input");
        errorMedicines.innerText = "Nie wybrano leku.";
    }

    if (!checkRequired(wholesalerInput.value)) {
        valid = false;
        wholesalerInput.classList.add("error-input");
        errorWholesaler.innerText = "Nie wybrano hurtowni.";
    }

    if (!checkRequired(amountInput.value)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = "Ilość nie może być pusta.";
    } else if (!checkIfItContainsOnly("numbers", amountInput.value)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = "Ilość może zawierać tylko cyfry.";
    } else if (!checkNumberRange(amountInput.value, 1, 9999)) {
        valid = false;
        amountInput.classList.add("error-input");
        errorAmount.innerText = "Ilość musi być wartością od 1 do 9999.";
    }

    if (!checkRequired(dateOfPurchaseInput.value)) {
        valid = false;
        dateOfPurchaseInput.classList.add("error-input");
        errorDateOfPurchase.innerText = "Data zakupu nie może być pusta.";
    } else if (!checkDateFormat(dateOfPurchaseInput.value)) {
        valid = false;
        dateOfPurchaseInput.classList.add("error-input");
        errorDateOfPurchase.innerText = "Wprowadzono błędny format daty. Data powinna być w formacie dd.MM.rrrrr (np. 02.11.2023).";
    } else if (checkThatDateIs_ThanTheCurrent("later", dateOfPurchaseInput.value)) {
        valid = false;
        dateOfPurchaseInput.classList.add("error-input");
        errorDateOfPurchase.innerText = "Data zakupu nie może być późniejsza niż aktualna data.";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz został błędnie wypełniony.";
    }

    return valid;
}
"use strict";

/* =======================
   DEFAULT VALUES
======================= */
const DEFAULT_NAME = "Jane Appleseed";
const DEFAULT_NUMBER = "0000 0000 0000 0000";
const DEFAULT_EXPIRY = "00/00";
const DEFAULT_CVC = "000";

/* =======================
   GET ELEMENTS
======================= */
const form = document.getElementById("card-form");
const formSection = document.getElementById("form-section");
const thankYouSection = document.getElementById("thank-you-section");

const nameInput = document.getElementById("cardHolderName");
const numberInput = document.getElementById("cardNumber");
const monthInput = document.getElementById("expMonth");
const yearInput = document.getElementById("expYear");
const cvcInput = document.getElementById("cvc");
const continueBtn = document.getElementById("continue-btn");

const previewName = document.getElementById("preview-name");
const previewNumber = document.getElementById("preview-number");
const previewExp = document.getElementById("preview-exp");
const previewCvc = document.getElementById("preview-cvc");

/* Remove all non-numeric characters */
function onlyNumbers(value) {
  return value.replace(/\D/g, "");
}

/* Format card number into groups of 4 digits */
function formatCardNumber(value) {
  const digits = onlyNumbers(value).slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

/* Show error message */
function showError(input, message) {
  const errorEl = input.parentElement.querySelector(".error-msg");

  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");

  errorEl.textContent = message;
  errorEl.classList.add("active");
}

/* Remove error message */
function removeError(input) {
  const errorEl = input.parentElement.querySelector(".error-msg");

  input.classList.remove("error");
  input.removeAttribute("aria-invalid");

  errorEl.textContent = "";
  errorEl.classList.remove("active");
}

/* =====================================================
   VALIDATION FUNCTIONS
===================================================== */

/* Validate Name */
function validateName() {
  const value = nameInput.value.trim();

  if (value.length < 3 || !/^[a-zA-Z ]+$/.test(value)) {
    showError(nameInput, "Name must contain only letters");
    return false;
  }

  removeError(nameInput);
  return true;
}

/* Validate Card Number */
function validateNumber() {
  const digits = onlyNumbers(numberInput.value);

  if (digits.length !== 16) {
    showError(numberInput, "Card number must be 16 digits");
    return false;
  }

  removeError(numberInput);
  return true;
}

/* Validate Expiry Date */
function validateExpiry() {
  const month = monthInput.value;
  const year = yearInput.value;
  const errorEl = document.getElementById("exp-error");

  errorEl.textContent = "";
  errorEl.classList.remove("active");

  if (!month || !year) {
    errorEl.textContent = "Expiry date required";
    errorEl.classList.add("active");
    return false;
  }

  if (month < 1 || month > 12) {
    errorEl.textContent = "Invalid month";
    errorEl.classList.add("active");
    return false;
  }

  if (year.length !== 2) {
    errorEl.textContent = "Invalid year";
    errorEl.classList.add("active");
    return false;
  }

  return true;
}

/* Validate CVC */
function validateCvc() {
  if (!/^\d{3}$/.test(cvcInput.value)) {
    showError(cvcInput, "CVC must be 3 digits");
    return false;
  }

  removeError(cvcInput);
  return true;
}

/* =====================================================
   LIVE INPUT PREVIEW UPDATES
===================================================== */

nameInput.addEventListener("input", function () {
  previewName.textContent = nameInput.value || DEFAULT_NAME;
  validateName();
});

numberInput.addEventListener("input", function () {
  numberInput.value = formatCardNumber(numberInput.value);
  previewNumber.textContent = numberInput.value || DEFAULT_NUMBER;
  validateNumber();
});

function updateExpiryPreview() {
  monthInput.value = onlyNumbers(monthInput.value).slice(0, 2);
  yearInput.value = onlyNumbers(yearInput.value).slice(0, 2);

  const mm = monthInput.value.padStart(2, "0");
  const yy = yearInput.value.padStart(2, "0");

  previewExp.textContent =
    monthInput.value && yearInput.value ? `${mm}/${yy}` : DEFAULT_EXPIRY;

  validateExpiry();
}

monthInput.addEventListener("input", updateExpiryPreview);
yearInput.addEventListener("input", updateExpiryPreview);

cvcInput.addEventListener("input", function () {
  cvcInput.value = onlyNumbers(cvcInput.value).slice(0, 3);
  previewCvc.textContent = cvcInput.value ? "***" : DEFAULT_CVC;
  validateCvc();
});

/* =====================================================
   FORM SUBMISSION
===================================================== */

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid =
    validateName() && validateNumber() && validateExpiry() && validateCvc();

  if (!isValid) return;

  formSection.hidden = true;
  thankYouSection.hidden = false;
});

/* =====================================================
   RESET FORM (Continue Button)
===================================================== */

continueBtn.addEventListener("click", function () {
  form.reset();

  previewName.textContent = DEFAULT_NAME;
  previewNumber.textContent = DEFAULT_NUMBER;
  previewExp.textContent = DEFAULT_EXPIRY;
  previewCvc.textContent = DEFAULT_CVC;

  thankYouSection.hidden = true;
  formSection.hidden = false;
});

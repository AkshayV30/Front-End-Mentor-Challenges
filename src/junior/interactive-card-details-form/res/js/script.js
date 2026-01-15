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

/* Inputs */
const nameInput = document.getElementById("cardHolderName");
const numberInput = document.getElementById("cardNumber");
const monthInput = document.getElementById("expMonth");
const yearInput = document.getElementById("expYear");
const cvcInput = document.getElementById("cvc");
const continueBtn = document.getElementById("continue-btn");

/* Card Preview */
const previewName = document.getElementById("preview-name");
const previewNumber = document.getElementById("preview-number");
const previewExp = document.getElementById("preview-exp");
const previewCvc = document.getElementById("preview-cvc");

/* =======================
   HELPER FUNCTIONS
======================= */

/* Allow only numbers */
const onlyNumbers = (value) => {
  return value.replace(/[^0-9]/g, "");
};

/* Format card number: 0000 0000 0000 0000 */
const formatCardNumber = (value) => {
  const digits = onlyNumbers(value).slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

/* Get error message element */
const getErrorElement = (input) => {
  return input.parentElement.querySelector(".error-msg");
};

/* Show error */
const showError = (input, message) => {
  const errorEl = getErrorElement(input);
  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
  errorEl.classList.add("active");
};

/* Remove error */
const removeError = (input) => {
  const errorEl = getErrorElement(input);
  input.classList.remove("error");
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
  errorEl.classList.remove("active");
};

/* =======================
   VALIDATION FUNCTIONS
======================= */

const validateName = () => {
  const value = nameInput.value.trim();

  if (value.length < 3 || !/^[a-zA-Z ]+$/.test(value)) {
    showError(nameInput, "Name must contain only letters");
    return false;
  }

  removeError(nameInput);
  return true;
};

const validateCardNumber = () => {
  const digits = onlyNumbers(numberInput.value);

  if (digits.length !== 16) {
    showError(numberInput, "Wrong format, numbers only");
    return false;
  }

  removeError(numberInput);
  return true;
};

const validateExpiry = () => {
  const month = monthInput.value;
  const year = yearInput.value;
  const errorEl = document.getElementById("exp-error");

  errorEl.textContent = "";
  errorEl.classList.remove("active");

  monthInput.classList.remove("error");
  yearInput.classList.remove("error");

  if (!month || !year) {
    errorEl.textContent = "Expiry date required";
    errorEl.classList.add("active");

    if (!month) monthInput.classList.add("error");
    if (!year) yearInput.classList.add("error");
    return false;
  }

  if (month < 1 || month > 12) {
    errorEl.textContent = "Invalid month";
    errorEl.classList.add("active");
    monthInput.classList.add("error");
    return false;
  }

  if (year.length !== 2) {
    errorEl.textContent = "Invalid year";
    errorEl.classList.add("active");
    yearInput.classList.add("error");
    return false;
  }

  return true;
};

const validateCvc = () => {
  if (!/^\d{3}$/.test(cvcInput.value)) {
    showError(cvcInput, "CVC must be 3 digits");
    return false;
  }

  removeError(cvcInput);
  return true;
};

/* =======================
   LIVE INPUT HANDLERS
======================= */

nameInput.addEventListener("input", () => {
  previewName.textContent = nameInput.value || DEFAULT_NAME;
  validateName();
});

numberInput.addEventListener("input", () => {
  numberInput.value = formatCardNumber(numberInput.value);
  previewNumber.textContent = numberInput.value || DEFAULT_NUMBER;
  validateCardNumber();
});

const updateExpiryPreview = () => {
  monthInput.value = onlyNumbers(monthInput.value).slice(0, 2);
  yearInput.value = onlyNumbers(yearInput.value).slice(0, 2);

  const mm = monthInput.value.padStart(2, "0");
  const yy = yearInput.value.padStart(2, "0");

  previewExp.textContent =
    monthInput.value && yearInput.value ? `${mm}/${yy}` : DEFAULT_EXPIRY;

  validateExpiry();
};

monthInput.addEventListener("input", updateExpiryPreview);
yearInput.addEventListener("input", updateExpiryPreview);

cvcInput.addEventListener("input", () => {
  cvcInput.value = onlyNumbers(cvcInput.value).slice(0, 3);

  /* Mask CVC in preview */
  previewCvc.textContent = cvcInput.value ? "***" : DEFAULT_CVC;

  validateCvc();
});

/* =======================
   FORM SUBMIT
======================= */

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValid =
    validateName() && validateCardNumber() && validateExpiry() && validateCvc();

  if (!isValid) return;

  formSection.hidden = true;
  thankYouSection.hidden = false;
});

/* =======================
   CONTINUE BUTTON
======================= */

continueBtn.addEventListener("click", () => {
  form.reset();

  previewName.textContent = DEFAULT_NAME;
  previewNumber.textContent = DEFAULT_NUMBER;
  previewExp.textContent = DEFAULT_EXPIRY;
  previewCvc.textContent = DEFAULT_CVC;

  document.querySelectorAll(".error-msg").forEach((el) => {
    el.textContent = "";
    el.classList.remove("active");
  });

  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("error");
    input.removeAttribute("aria-invalid");
  });

  thankYouSection.hidden = true;
  formSection.hidden = false;

  nameInput.focus();
});

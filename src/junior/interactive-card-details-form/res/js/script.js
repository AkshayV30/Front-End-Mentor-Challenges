"use strict";

/* =======================
   CONSTANTS
======================= */
const DEFAULTS = {
  name: "Jane Appleseed",
  number: "0000 0000 0000 0000",
  exp: "00/00",
  cvc: "000",
};

/* =======================
   DOM REFERENCES
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

/* Preview */
const previewName = document.getElementById("preview-name");
const previewNumber = document.getElementById("preview-number");
const previewExp = document.getElementById("preview-exp");
const previewCvc = document.getElementById("preview-cvc");

/* =======================
   HELPERS
======================= */
const digitsOnly = (v) => v.replace(/\D/g, "");

function formatCardNumber(value) {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function getErrorEl(input) {
  const group = input.closest("[data-group]");
  return group
    ? group.querySelector(".error-msg")
    : input.parentElement.querySelector(".error-msg");
}

function setError(input, message) {
  const errorEl = getErrorEl(input);
  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
  errorEl.classList.add("active");
}

function clearError(input) {
  const errorEl = getErrorEl(input);
  input.classList.remove("error");
  input.setAttribute("aria-invalid", "false");
  errorEl.textContent = "";
  errorEl.classList.remove("active");
}

/* =======================
   VALIDATION
======================= */
function validateName() {
  const v = nameInput.value.trim();
  if (!/^[a-zA-Z ]{3,}$/.test(v)) {
    setError(nameInput, "Name must contain only letters");
    return false;
  }
  clearError(nameInput);
  return true;
}

function validateNumber() {
  const digits = digitsOnly(numberInput.value);
  if (digits.length !== 16) {
    setError(numberInput, "Wrong format, numbers only");
    return false;
  }
  clearError(numberInput);
  return true;
}

function validateExpiry() {
  const m = monthInput.value.trim();
  const y = yearInput.value.trim();
  const errorEl = document.getElementById("exp-error");

  // Clear previous state
  clearError(monthInput);
  clearError(yearInput);

  if (!m || !y) {
    errorEl.textContent = "Expiry date required";
    errorEl.classList.add("active");

    if (!m) monthInput.classList.add("error");
    if (!y) yearInput.classList.add("error");
    return false;
  }

  if (+m < 1 || +m > 12) {
    errorEl.textContent = "Invalid month";
    errorEl.classList.add("active");
    monthInput.classList.add("error");
    return false;
  }

  if (!/^\d{2}$/.test(y)) {
    errorEl.textContent = "Invalid year";
    errorEl.classList.add("active");
    yearInput.classList.add("error");
    return false;
  }

  errorEl.textContent = "";
  errorEl.classList.remove("active");
  return true;
}

function validateCvc() {
  if (!/^\d{3}$/.test(cvcInput.value)) {
    setError(cvcInput, "CVC must be 3 digits");
    return false;
  }
  clearError(cvcInput);
  return true;
}

/* =======================
   LIVE PREVIEW
======================= */
nameInput.addEventListener("input", () => {
  previewName.textContent = nameInput.value || DEFAULTS.name;
  validateName();
});

numberInput.addEventListener("input", () => {
  numberInput.value = formatCardNumber(numberInput.value);
  previewNumber.textContent = numberInput.value || DEFAULTS.number;
  validateNumber();
});

monthInput.addEventListener("input", updateExpiry);
yearInput.addEventListener("input", updateExpiry);

function updateExpiry() {
  monthInput.value = digitsOnly(monthInput.value).slice(0, 2);
  yearInput.value = digitsOnly(yearInput.value).slice(0, 2);

  const mm = monthInput.value.padStart(2, "0");
  const yy = yearInput.value.padStart(2, "0");

  previewExp.textContent =
    monthInput.value && yearInput.value ? `${mm}/${yy}` : DEFAULTS.exp;

  validateExpiry();
}

cvcInput.addEventListener("input", () => {
  cvcInput.value = digitsOnly(cvcInput.value).slice(0, 3);
  previewCvc.textContent = cvcInput.value ? "***" : DEFAULTS.cvc;
  validateCvc();
});

/* =======================
   SUBMIT
======================= */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid =
    validateName() & validateNumber() & validateExpiry() & validateCvc();

  if (!isValid) return;

  formSection.hidden = true;
  thankYouSection.hidden = false;
});

// continue btn
continueBtn.addEventListener("click", () => {
  // Reset form fields
  form.reset();

  // Reset previews
  previewName.textContent = DEFAULTS.name;
  previewNumber.textContent = DEFAULTS.number;
  previewExp.textContent = DEFAULTS.exp;
  previewCvc.textContent = DEFAULTS.cvc;

  // Clear errors
  document.querySelectorAll(".error-msg").forEach((el) => {
    el.textContent = "";
    el.classList.remove("active");
  });

  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("error");
    input.removeAttribute("aria-invalid");
  });

  // Switch UI
  thankYouSection.hidden = true;
  formSection.hidden = false;

  // Focus first field (UX polish)
  nameInput.focus();
});

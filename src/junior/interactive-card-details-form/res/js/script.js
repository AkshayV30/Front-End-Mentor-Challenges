"use strict";

/* =======================
   DEFAULT VALUES
======================= */
// const DEFAULT_NAME = "Jane Appleseed";
// const DEFAULT_NUMBER = "0000 0000 0000 0000";
// const DEFAULT_EXPIRY = "00/00";
// const DEFAULT_CVC = "000";

const DEFAULTS = Object.freeze({
  NAME: "Jane Appleseed",
  NUMBER: "0000 0000 0000 0000",
  EXP: "00/00",
  CVC: "000",
});

/* =======================
   GET ELEMENTS
======================= */
// const form = document.getElementById("card-form");
// const formSection = document.getElementById("form-section");
// const thankYouSection = document.getElementById("thank-you-section");

// const nameInput = document.getElementById("cardHolderName");
// const numberInput = document.getElementById("cardNumber");
// const monthInput = document.getElementById("expMonth");
// const yearInput = document.getElementById("expYear");
// const cvcInput = document.getElementById("cvc");
// const continueBtn = document.getElementById("continue-btn");

// const previewName = document.getElementById("preview-name");
// const previewNumber = document.getElementById("preview-number");
// const previewExp = document.getElementById("preview-exp");
// const previewCvc = document.getElementById("preview-cvc");

const DOM = Object.freeze({
  form: document.getElementById("card-form"),
  formSection: document.getElementById("form-section"),
  thankYouSection: document.getElementById("thank-you-section"),

  inputs: {
    name: document.getElementById("cardHolderName"),
    number: document.getElementById("cardNumber"),
    month: document.getElementById("expMonth"),
    year: document.getElementById("expYear"),
    cvc: document.getElementById("cvc"),
  },

  preview: {
    name: document.getElementById("preview-name"),
    number: document.getElementById("preview-number"),
    exp: document.getElementById("preview-exp"),
    cvc: document.getElementById("preview-cvc"),
  },

  expError: document.getElementById("exp-error"),
  continueBtn: document.getElementById("continue-btn"),
});
/* =======================
   HELPER FUNCTIONS
======================= */

/* Allow only numbers */
// const onlyNumbers = (value) => {
//   return value.replace(/[^0-9]/g, "");
// };
const onlyNumbers = (value = "") => value.replace(/\D/g, "");

/* Format card number: 0000 0000 0000 0000 */
// const formatCardNumber = (value) => {
//   const digits = onlyNumbers(value).slice(0, 16);
//   return digits.replace(/(.{4})/g, "$1 ").trim();
// };

const formatCardNumber = (value) =>
  onlyNumbers(value)
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

/* Get error message element */
// const getErrorElement = (input) => {
//   return input.parentElement.querySelector(".error-msg");
// };

const pad2 = (value) => value.padStart(2, "0");

const getErrorElement = (input) =>
  input.closest("[data-group]")?.querySelector(".error-msg") ||
  input.parentElement.querySelector(".error-msg");

//  ERROR HANDLING (UI LAYER)
/* Show error */
const showError = (input, message) => {
  const errorEl = getErrorElement(input);

  if (!errorEl) return;

  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
  errorEl.classList.add("active");
};

/* Remove error */
const removeError = (input) => {
  const errorEl = getErrorElement(input);

  if (!errorEl) return;

  input.classList.remove("error");
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
  errorEl.classList.remove("active");
};

/* =======================
   VALIDATION FUNCTIONS
======================= */

const validators = {
  name: (v) => /^[a-zA-Z ]{3,}$/.test(v.trim()),
  number: (v) => onlyNumbers(v).length === 16,
  month: (v) => /^\d{1,2}$/.test(v) && +v >= 1 && +v <= 12,
  year: (v) => /^\d{2}$/.test(v),
  cvc: (v) => /^\d{3}$/.test(v),
};

// const validateName = () => {
//   const value = nameInput.value.trim();

//   if (value.length < 3 || !/^[a-zA-Z ]+$/.test(value)) {
//     showError(nameInput, "Name must contain only letters");
//     return false;
//   }

//   removeError(nameInput);
//   return true;
// };
const validateName = () => {
  const { name } = DOM.inputs;
  if (!validators.name(name.value)) {
    showError(name, "Name must contain only letters");
    return false;
  }
  removeError(name);
  return true;
};

// const validateCardNumber = () => {
//   const digits = onlyNumbers(numberInput.value);

//   if (digits.length !== 16) {
//     showError(numberInput, "Wrong format, numbers only");
//     return false;
//   }

//   removeError(numberInput);
//   return true;
// };

const validateNumber = () => {
  const { number } = DOM.inputs;
  if (!validators.number(number.value)) {
    showError(number, "Wrong format, numbers only");
    return false;
  }
  removeError(number);
  return true;
};

// const validateExpiry = () => {
//   const month = monthInput.value;
//   const year = yearInput.value;
//   const errorEl = document.getElementById("exp-error");

//   errorEl.textContent = "";
//   errorEl.classList.remove("active");

//   monthInput.classList.remove("error");
//   yearInput.classList.remove("error");

//   if (!month || !year) {
//     errorEl.textContent = "Expiry date required";
//     errorEl.classList.add("active");

//     if (!month) monthInput.classList.add("error");
//     if (!year) yearInput.classList.add("error");
//     return false;
//   }

//   if (month < 1 || month > 12) {
//     errorEl.textContent = "Invalid month";
//     errorEl.classList.add("active");
//     monthInput.classList.add("error");
//     return false;
//   }

//   if (year.length !== 2) {
//     errorEl.textContent = "Invalid year";
//     errorEl.classList.add("active");
//     yearInput.classList.add("error");
//     return false;
//   }

//   return true;
// };

const validateExpiry = () => {
  const { month, year } = DOM.inputs;
  const errorEl = DOM.expError;

  errorEl.textContent = "";
  errorEl.classList.remove("active");
  month.classList.remove("error");
  year.classList.remove("error");

  if (!month.value || !year.value) {
    errorEl.textContent = "Expiry date required";
    errorEl.classList.add("active");
    if (!month.value) month.classList.add("error");
    if (!year.value) year.classList.add("error");
    return false;
  }

  if (!validators.month(month.value)) {
    errorEl.textContent = "Invalid month";
    errorEl.classList.add("active");
    month.classList.add("error");
    return false;
  }

  if (!validators.year(year.value)) {
    errorEl.textContent = "Invalid year";
    errorEl.classList.add("active");
    year.classList.add("error");
    return false;
  }

  return true;
};

// const validateCvc = () => {
//   if (!/^\d{3}$/.test(cvcInput.value)) {
//     showError(cvcInput, "CVC must be 3 digits");
//     return false;
//   }

//   removeError(cvcInput);
//   return true;
// };

const validateCvc = () => {
  const { cvc } = DOM.inputs;
  if (!validators.cvc(cvc.value)) {
    showError(cvc, "CVC must be 3 digits");
    return false;
  }
  removeError(cvc);
  return true;
};

/* =======================
   LIVE INPUT HANDLERS
======================= */

// nameInput.addEventListener("input", () => {
//   previewName.textContent = nameInput.value || DEFAULT_NAME;
//   validateName();
// });
const updateNamePreview = () => {
  DOM.preview.name.textContent = DOM.inputs.name.value || DEFAULTS.NAME;
  validateName();
};

// numberInput.addEventListener("input", () => {
//   numberInput.value = formatCardNumber(numberInput.value);
//   previewNumber.textContent = numberInput.value || DEFAULT_NUMBER;
//   validateCardNumber();
// });

const updateNumberPreview = () => {
  const { number } = DOM.inputs;
  number.value = formatCardNumber(number.value);
  DOM.preview.number.textContent = number.value || DEFAULTS.NUMBER;
  validateNumber();
};

// const updateExpiryPreview = () => {
//   monthInput.value = onlyNumbers(monthInput.value).slice(0, 2);
//   yearInput.value = onlyNumbers(yearInput.value).slice(0, 2);

//   const mm = monthInput.value.padStart(2, "0");
//   const yy = yearInput.value.padStart(2, "0");

//   previewExp.textContent =
//     monthInput.value && yearInput.value ? `${mm}/${yy}` : DEFAULT_EXPIRY;

//   validateExpiry();
// };

// monthInput.addEventListener("input", updateExpiryPreview);
// yearInput.addEventListener("input", updateExpiryPreview);

const updateExpiryPreview = () => {
  const { month, year } = DOM.inputs;

  month.value = onlyNumbers(month.value).slice(0, 2);
  year.value = onlyNumbers(year.value).slice(0, 2);

  DOM.preview.exp.textContent =
    month.value && year.value
      ? `${pad2(month.value)}/${pad2(year.value)}`
      : DEFAULTS.EXP;

  validateExpiry();
};

// cvcInput.addEventListener("input", () => {
//   cvcInput.value = onlyNumbers(cvcInput.value).slice(0, 3);

//   /* Mask CVC in preview */
//   previewCvc.textContent = cvcInput.value ? "***" : DEFAULT_CVC;

//   validateCvc();
// });

const updateCvcPreview = () => {
  const { cvc } = DOM.inputs;
  cvc.value = onlyNumbers(cvc.value).slice(0, 3);
  DOM.preview.cvc.textContent = cvc.value ? "***" : DEFAULTS.CVC;
  validateCvc();
};

/* =======================
   FORM SUBMIT
======================= */

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const isValid =
//     validateName() && validateCardNumber() && validateExpiry() && validateCvc();

//   if (!isValid) return;

//   formSection.hidden = true;
//   thankYouSection.hidden = false;
// });

/* =======================
   CONTINUE BUTTON
======================= */

// continueBtn.addEventListener("click", () => {
//   form.reset();

//   previewName.textContent = DEFAULT_NAME;
//   previewNumber.textContent = DEFAULT_NUMBER;
//   previewExp.textContent = DEFAULT_EXPIRY;
//   previewCvc.textContent = DEFAULT_CVC;

//   document.querySelectorAll(".error-msg").forEach((el) => {
//     el.textContent = "";
//     el.classList.remove("active");
//   });

//   document.querySelectorAll("input").forEach((input) => {
//     input.classList.remove("error");
//     input.removeAttribute("aria-invalid");
//   });

//   thankYouSection.hidden = true;
//   formSection.hidden = false;

//   nameInput.focus();
// });

const handleSubmit = (e) => {
  e.preventDefault();

  const valid =
    validateName() && validateNumber() && validateExpiry() && validateCvc();

  if (!valid) return;

  DOM.formSection.hidden = true;
  DOM.thankYouSection.hidden = false;
};

const handleContinue = () => {
  DOM.form.reset();

  DOM.preview.name.textContent = DEFAULTS.NAME;
  DOM.preview.number.textContent = DEFAULTS.NUMBER;
  DOM.preview.exp.textContent = DEFAULTS.EXP;
  DOM.preview.cvc.textContent = DEFAULTS.CVC;

  document.querySelectorAll(".error-msg").forEach((el) => {
    el.textContent = "";
    el.classList.remove("active");
  });

  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("error");
    input.removeAttribute("aria-invalid");
  });

  DOM.thankYouSection.hidden = true;
  DOM.formSection.hidden = false;
  DOM.inputs.name.focus();
};

const init = () => {
  DOM.inputs.name.addEventListener("input", updateNamePreview);
  DOM.inputs.number.addEventListener("input", updateNumberPreview);
  DOM.inputs.month.addEventListener("input", updateExpiryPreview);
  DOM.inputs.year.addEventListener("input", updateExpiryPreview);
  DOM.inputs.cvc.addEventListener("input", updateCvcPreview);

  DOM.form.addEventListener("submit", handleSubmit);
  DOM.continueBtn.addEventListener("click", handleContinue);
};

init();

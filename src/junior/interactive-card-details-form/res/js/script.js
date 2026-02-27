"use strict";

/* =========================================================
   CARD FORM APPLICATION (OOP + Luhn + Real Date Validation)
========================================================= */

class CardForm {
  constructor() {
    /* ==============================
       DEFAULT PREVIEW VALUES
    =============================== */
    this.DEFAULTS = Object.freeze({
      name: "Jane Appleseed",
      number: "0000 0000 0000 0000",
      exp: "00/00",
      cvc: "000",
    });

    /* ==============================
       CACHE DOM ELEMENTS
    =============================== */
    this.DOM = {
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
    };

    this.init();
  }

  /* =========================================================
     UTILITY FUNCTIONS
  ========================================================= */

  onlyNumbers(value = "") {
    return value.replace(/\D/g, "");
  }

  formatCardNumber(value) {
    return this.onlyNumbers(value)
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  pad2(value) {
    return value.padStart(2, "0");
  }

  /* =========================================================
     LUHN ALGORITHM 
     Steps:
     1. Double every second digit from right
     2. If result > 9 subtract 9
     3. Sum all digits
     4. If sum % 10 === 0 → valid
  ========================================================= */

  validateLuhn(cardNumber) {
    const digits = this.onlyNumbers(cardNumber);

    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

  /* =========================================================
     ERROR HANDLING
  ========================================================= */

  getErrorElement(input) {
    return (
      input.closest("[data-group]")?.querySelector(".error-msg") ||
      input.parentElement.querySelector(".error-msg")
    );
  }

  showError(input, message) {
    const errorEl = this.getErrorElement(input);
    if (!errorEl) return;

    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");

    errorEl.textContent = message;
    errorEl.classList.add("active");
  }

  removeError(input) {
    const errorEl = this.getErrorElement(input);
    if (!errorEl) return;

    input.classList.remove("error");
    input.removeAttribute("aria-invalid");

    errorEl.textContent = "";
    errorEl.classList.remove("active");
  }

  /* =========================================================
     VALIDATION METHODS
  ========================================================= */

  validateName() {
    const value = this.DOM.inputs.name.value.trim();

    if (!/^[a-zA-Z ]{3,}$/.test(value)) {
      this.showError(this.DOM.inputs.name, "Invalid name");
      return false;
    }

    this.removeError(this.DOM.inputs.name);
    return true;
  }

  validateCardNumber() {
    const number = this.DOM.inputs.number.value;

    if (this.onlyNumbers(number).length !== 16 || !this.validateLuhn(number)) {
      this.showError(this.DOM.inputs.number, "Invalid card number");
      return false;
    }

    this.removeError(this.DOM.inputs.number);
    return true;
  }

  /* Real-time expiry validation against current date */
  validateExpiry() {
    const month = this.DOM.inputs.month.value;
    const year = this.DOM.inputs.year.value;

    const errorEl = this.DOM.expError;
    errorEl.textContent = "";
    errorEl.classList.remove("active");

    if (!month || !year) {
      errorEl.textContent = "Expiry date required";
      errorEl.classList.add("active");
      return false;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100; // 2-digit year

    const inputMonth = parseInt(month);
    const inputYear = parseInt(year);

    if (inputMonth < 1 || inputMonth > 12) {
      errorEl.textContent = "Invalid month";
      errorEl.classList.add("active");
      return false;
    }

    if (inputYear < currentYear) {
      errorEl.textContent = "Card expired";
      errorEl.classList.add("active");
      return false;
    }

    if (inputYear === currentYear && inputMonth < currentMonth) {
      errorEl.textContent = "Card expired";
      errorEl.classList.add("active");
      return false;
    }

    return true;
  }

  validateCvc() {
    const value = this.DOM.inputs.cvc.value;

    if (!/^\d{3}$/.test(value)) {
      this.showError(this.DOM.inputs.cvc, "Invalid CVC");
      return false;
    }

    this.removeError(this.DOM.inputs.cvc);
    return true;
  }

  /* =========================================================
     LIVE PREVIEW UPDATE
  ========================================================= */

  updatePreview() {
    const { name, number, month, year, cvc } = this.DOM.inputs;

    this.DOM.preview.name.textContent = name.value || this.DEFAULTS.name;

    number.value = this.formatCardNumber(number.value);
    this.DOM.preview.number.textContent = number.value || this.DEFAULTS.number;

    month.value = this.onlyNumbers(month.value).slice(0, 2);
    year.value = this.onlyNumbers(year.value).slice(0, 2);

    this.DOM.preview.exp.textContent =
      month.value && year.value
        ? `${this.pad2(month.value)}/${this.pad2(year.value)}`
        : this.DEFAULTS.exp;

    cvc.value = this.onlyNumbers(cvc.value).slice(0, 3);
    this.DOM.preview.cvc.textContent = cvc.value ? "***" : this.DEFAULTS.cvc;
  }

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      this.validateName() &&
      this.validateCardNumber() &&
      this.validateExpiry() &&
      this.validateCvc();

    if (!isValid) return;

    this.DOM.formSection.hidden = true;
    this.DOM.thankYouSection.hidden = false;
  };

  /* =========================================================
     INITIALIZATION
  ========================================================= */

  init() {
    Object.values(this.DOM.inputs).forEach((input) =>
      input.addEventListener("input", () => this.updatePreview()),
    );

    this.DOM.form.addEventListener("submit", this.handleSubmit);

    this.DOM.continueBtn.addEventListener("click", () => {
      this.DOM.form.reset();
      this.updatePreview();
      this.DOM.thankYouSection.hidden = true;
      this.DOM.formSection.hidden = false;
    });
  }
}

/* =========================================================
   CREATE APPLICATION INSTANCE
========================================================= */

new CardForm();

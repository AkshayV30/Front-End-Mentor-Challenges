"use strict";

const form = document.getElementById("card-form");
const formSection = document.getElementById("form-section");
const thankYouSection = document.getElementById("thank-you-section");

const nameInput = document.getElementById("cardHolderName");
const numberInput = document.getElementById("cardNumber");
const monthInput = document.getElementById("expMonth");
const yearInput = document.getElementById("expYear");
const cvcInput = document.getElementById("cvc");

const previewName = document.getElementById("preview-name");
const previewNumber = document.getElementById("preview-number");
const previewExp = document.getElementById("preview-exp");
const previewCvc = document.getElementById("preview-cvc");

nameInput.addEventListener("input", () => {
  previewName.textContent = nameInput.value || "Jane Appleseed";
});

numberInput.addEventListener("input", () => {
  previewNumber.textContent = numberInput.value || "0000 0000 0000 0000";
});

monthInput.addEventListener("input", updateExpiry);
yearInput.addEventListener("input", updateExpiry);

function updateExpiry() {
  previewExp.textContent = `${monthInput.value || "00"}/${
    yearInput.value || "00"
  }`;
}

cvcInput.addEventListener("input", () => {
  previewCvc.textContent = cvcInput.value || "000";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (form.checkValidity()) {
    formSection.hidden = true;
    thankYouSection.hidden = false;
  }
});

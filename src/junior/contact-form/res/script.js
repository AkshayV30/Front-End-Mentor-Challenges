const form = document.getElementById("contactForm");
const modal = document.getElementById("successModal");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const error = field
      .closest(".form-group, fieldset, .checkbox")
      ?.querySelector(".error");

    if (!field.checkValidity()) {
      valid = false;
      if (error) error.style.display = "block";
    } else {
      if (error) error.style.display = "none";
    }
  });

  if (valid) {
    modal.style.display = "block";
    form.reset();

    // Optional browser alert
    alert("Thanks for completing the contact form!");
  }
});

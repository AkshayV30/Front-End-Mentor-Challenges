const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

// Fields configuration
const fields = [
  { id: "firstName", message: "First name is required" },
  { id: "lastName", message: "Last name is required" },
  {
    id: "email",
    message: "Please enter a valid email",
    pattern: /^\S+@\S+\.\S+$/,
  },
  { id: "message", message: "Message is required" },
];

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = message;
  error.style.display = "block";
  input.classList.add("invalid");
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = "";
  error.style.display = "none";
  input.classList.remove("invalid");
}

function validateForm() {
  let valid = true;

  fields.forEach(({ id, message, pattern }) => {
    const input = document.getElementById(id);

    if (!input.value.trim() || (pattern && !pattern.test(input.value))) {
      showError(input, message);
      valid = false;
    } else {
      clearError(input);
    }
  });

  // Radio validation
  const query = document.querySelector('input[name="query"]:checked');
  const queryError = document.querySelector("fieldset .error");

  if (!query) {
    queryError.textContent = "Please select a query type";
    queryError.style.display = "block";
    valid = false;
  } else {
    queryError.style.display = "none";
  }

  // Consent validation
  const consent = document.getElementById("consent");
  const consentError = consent.closest(".checkbox").querySelector(".error");

  if (!consent.checked) {
    consentError.textContent = "Consent is required";
    consentError.style.display = "block";
    valid = false;
  } else {
    consentError.style.display = "none";
  }

  return valid;
}

function showToast() {
  toast.classList.add("show");

  // Close when clicking outside
  document.addEventListener("click", hideToastOnOutsideClick);
}

function hideToastOnOutsideClick(e) {
  if (!toast.contains(e.target)) {
    toast.classList.remove("show");
    document.removeEventListener("click", hideToastOnOutsideClick);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    form.reset();
    showToast();
  }
});

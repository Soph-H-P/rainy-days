const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const submitButton = document.querySelector("#submit");
const commentField = document.querySelector("#comment");
const successMessage = document.querySelector(".success-message");
//Check input is the required length
const checkName = () => {
  if (nameInput.value.trim().length >= 2) {
    return true;
  } else {
    return false;
  }
};

//Validate name
const validateName = () => {
  if (!checkName()) {
    nameError.style.display = "block";
  } else {
    nameInput.style.borderBottom = "solid var(--confirmation-color) 5px";
    nameError.style.display = "none";
  }
};

const handleKeyUpName = () => {
  if (checkName()) {
    nameInput.style.borderBottom = "solid var(--confirmation-color) 5px";
    nameError.style.display = "none";
  } else {
    nameInput.style.borderBottom = "none";
  }

  if (checkEmail() && checkName()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }

  successMessage.style.display = "none";
};

nameInput.addEventListener("focusout", validateName);
nameInput.addEventListener("keyup", handleKeyUpName);

//Validate email
const checkEmail = () => {
  const emailRegEx = /\S+@\S+\.\S+/;
  const checkInput = emailRegEx.test(emailInput.value);
  return checkInput;
};

const validateEmail = () => {
  if (checkEmail()) {
    emailInput.style.borderBottom = "solid var(--confirmation-color) 5px";
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
};

const handleKeyUpEmail = () => {
  if (checkEmail()) {
    emailInput.style.borderBottom = "solid var(--confirmation-color) 5px";
    emailError.style.display = "none";
  } else {
    emailInput.style.borderBottom = "none";
  }

  if (checkEmail() && checkName()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

emailInput.addEventListener("focusout", validateEmail);
emailInput.addEventListener("keyup", handleKeyUpEmail);

const handleKeyUpComment = () => {
  if (checkEmail() && checkName()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

commentField.addEventListener("keyup", handleKeyUpComment);

const validateForm = () => {
  if (checkName() && checkEmail()) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (validateForm()) {
    form.reset();
    submitButton.disabled = true;
    successMessage.style.display = "block";
    emailInput.style.borderBottom = "none";
    nameInput.style.borderBottom = "none";
  }
};

form.addEventListener("submit", handleSubmit);

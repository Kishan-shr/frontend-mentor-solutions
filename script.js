const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

const formFields = {
  first: document.getElementById('fName'),
  last: document.getElementById('lName'),
  email: document.getElementById('email'),
  message: document.getElementById('message'),
  consent: document.getElementById('consent'),
  queryType: document.getElementsByName('option'),
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const isFormValid = validateInputs();

  if (isFormValid) {
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none'
    }, 2000);
    form.reset();
    clearStyles();
    
  }
});

const setError = (element, message) => {
  const inputControl = element.closest('.input-control');
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.closest('.input-control');
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const validateInputs = () => {
  let isValid = true;

  // Validate First Name
  if (!formFields.first.value.trim()) {
    setError(formFields.first, 'First Name is required');
    isValid = false;
  } else {
    setSuccess(formFields.first);
  }

  // Validate Last Name
  if (!formFields.last.value.trim()) {
    setError(formFields.last, 'Last Name is required');
    isValid = false;
  } else {
    setSuccess(formFields.last);
  }

  // Validate Email
  const emailValue = formFields.email.value.trim();
  if (!emailValue) {
    setError(formFields.email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(formFields.email, 'Provide a valid email address');
    isValid = false;
  } else {
    setSuccess(formFields.email);
  }

  // Validate Query Type
  const isQuerySelected = Array.from(formFields.queryType).some((radio) => radio.checked);
  if (!isQuerySelected) {
    setError(document.getElementById('queryType'), 'Please select a query type');
    isValid = false;
  } else {
    setSuccess(document.getElementById('queryType'));
  }

  // Validate Message
  if (!formFields.message.value.trim()) {
    setError(formFields.message, 'Message is required');
    isValid = false;
  } else {
    setSuccess(formFields.message);
  }

  // Validate Consent Checkbox
  if (!formFields.consent.checked) {
    setError(formFields.consent, 'You must consent to be contacted');
    isValid = false;
  } else {
    setSuccess(formFields.consent);
  }

  return isValid;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const clearStyles = () => {
  document.querySelectorAll('.input-control').forEach((control) => {
    control.classList.remove('error', 'success');
  });
};

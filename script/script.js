const inputs = document.querySelectorAll('input');
const showPassword = document.querySelector('#showPassword');
const formElement = document.querySelector('form');

const patterns = {
  phoneNumber: /^\d{12}$/,
  firstName: /^[a-z\s']{1,30}$/i,
  lastName: /^[a-z\s']{1,30}$/i,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*?.,<;>\/:'"|\\\{\[\]\}=+-_)(~`])[a-zA-Z0-9!@#$%^&*?.,<;>\/:'"|\\\{\[\]\}=+-_)(~`]{6,20}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}

const alerts = {
  phoneNumber: `* Phone number must be a valid IT telephone number (12 digits)`,
  firstName: `* First name must contain a valid name (1 - 30 characters)`,
  lastName: `* Last name must contain valid surname (1 - 30 characters)`,
  password: `* Password must alphanumeric with symbols (6 - 20 characters)`,
  email: `* Email must be a valid mail address, e.g. me@mydomain.com`,
  confirmPassword: `* Passwords do not match`
}

function addCustomValidationText(fieldName, valid = false) {
  const field = document.querySelector(`div[data-key="${fieldName}"]`);
  if(fieldName !== 'confirmPassword') {
    field.textContent = !valid ? alerts[fieldName] : '';
  } else {
    const passwordName = 'password';
    const password = document.querySelector(`div[data-key="${passwordName}"]`);
    if(password.textContent !== alerts[passwordName]) {
      password.textContent = !valid ? alerts[fieldName] : '';
    }
  }
}

function validate(field, regex) {
  if(regex.test(field.value)) {
    field.setCustomValidity('');
    addCustomValidationText(field.name, true);
  } else {
    field.setCustomValidity('invalid');
    addCustomValidationText(field.name);
  }
}

function validateConfirmPassword(field) {
  if(field.id === 'password') {
    const confirm = document.querySelector('#confirmPassword');
    if(!field.checkValidity()) {
      confirm.setCustomValidity('invalid');
    } else {
      if(confirm.value === field.value) {
        confirm.setCustomValidity('');
        addCustomValidationText("confirmPassword", true);
      } else {
        confirm.setCustomValidity('invalid');
        addCustomValidationText("confirmPassword");
      }
    }
    return;
  }
  const password = document.querySelector("#password");
  if(password.checkValidity()) {
    if(password.value === field.value) {
      field.setCustomValidity('');
      addCustomValidationText("confirmPassword", true);
    } else {
      field.setCustomValidity('invalid');
      addCustomValidationText("confirmPassword");
    }
  } else {
    field.setCustomValidity('invalid');
  }
}

inputs.forEach((input) => {
  if(undefined != input.attributes.name) {
    validate(input, patterns[input.attributes.name.value]);
  }
  input.addEventListener('keyup', (e) => {
    if(undefined != e.target.attributes.name) {
      validate(e.target, patterns[e.target.attributes.name.value]);
    }
    if((undefined != e.target.id) && ((e.target.id === 'confirmPassword') || (e.target.id === 'password'))) {
      validateConfirmPassword(e.target);
    }
  });
});

showPassword.addEventListener('click', (e) => {
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirmPassword');
  password.type = password.type === 'password' ? 'text' : 'password';
  confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';
})

formElement.addEventListener('invalid', (e) => {
  e.preventDefault();
}, true);

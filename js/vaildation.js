var validRegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,4})+$/;
var validRegexName = /^[a-zA-Z]+[a-zA-Z0-9]+[a-zA-Z]$/;

const nameError = document.querySelector(".nameError");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");
const matchPassword = document.querySelector(".matchPassword");

function validate() {
  const username = document.signUpForm.username.value;
  const email = document.signUpForm.email.value;
  const password = document.signUpForm.password.value;
  const password_confirmation = document.signUpForm.password_confirmation.value;
  if (username == "" || isFinite(username) || !username.match(validRegexName)) {
    document.signUpForm.username.style.borderColor = "red";
    nameError.innerHTML = ` -Please provide your name! <br/> - user name cant start or end with number 
    <br> - username cant include _ `;
    document.signUpForm.username.focus();
    throw "Please provide your name";
    return false;
  }
  if (document.signUpForm.email.value == "" || !email.match(validRegexEmail)) {
    document.signUpForm.email.style.borderColor = "red";

    emailError.innerHTML = `Please provide your Email! 
        <br>EX: abc@xyz.co `;
    document.signUpForm.email.focus();
    throw "Please provide your Email";
    return false;
  }
  if (password.length < 8) {
    document.signUpForm.password.style.borderColor = "red";
    passwordError.innerHTML = `- password must be at the least 8 dagits `;
    document.signUpForm.password.focus();
    throw "Please provide your password ";
    return false;
  }
  if (password != password_confirmation) {
    document.signUpForm.password.style.borderColor = "red";
    matchPassword.innerHTML = ` 
        - un matched password `;
    document.signUpForm.password_confirmation.focus();
    throw "Please provide your password  ";
    return false;
  }
  return true;
}

document.signUpForm.onsubmit = function (e) {
  e.preventDefault();
  const username = document.signUpForm.username.value;
  const email = document.signUpForm.email.value;
  const password = document.signUpForm.password.value;
  const password_confirmation = document.signUpForm.password_confirmation.value;

  if (validate()) {
    
    const userData = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {if(response.status==200){
        localStorage.setItem('email', email);
        window.location="succeed.html"
      } })
  }
};

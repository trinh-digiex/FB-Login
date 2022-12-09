let userNameInput = document.querySelector(".usernameInput");
let birthdayInput = document.querySelector(".birthdayInput");
let genderInput = document.querySelector(".genderInput");
let emailInput = document.querySelector(".emailInput");

let params = new URL(document.location).searchParams;
let code = params.get("code");

const APP_ID = process.env.APP_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

fetch(
  `https://graph.facebook.com/v15.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=https://localhost:5500/loggedIn.html&client_secret=${CLIENT_SECRET}&code=${code}`
)
  .then((response) => response.json())
  .then((data) => {
    fetch(
      `https://graph.facebook.com/v15.0/me?fields=id,name,birthday,gender,email&access_token=${data.access_token}`
    )
      .then((response) => response.json())
      .then((data) => {
        userNameInput.value = data.name;
        birthdayInput.value = data.birthday;
        genderInput.value = data.gender;
        emailInput.value = data.email;
      });
  });

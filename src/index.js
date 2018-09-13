let arraySliders = []
function createSliders() {
  a = [...document.getElementsByClassName('form-slider')]
  a.forEach( sliderElem => {
    let newSlider = new Slider(sliderElem, {
  	formatter: function(value) {
  		return 'Current value: ' + value;
    	}
    })
    arraySliders.push(newSlider)
  })
}

const nameInput = document.getElementById('inputName')
const emailInput = document.getElementById('inputEmail')
const slackUsername = document.getElementById('slack_username')
const modName = document.getElementById('inputModule')

function toggleForm() {
  var x = document.querySelector('div.sign-up-form')
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function createUser(){
  const name = nameInput.value
  const email = emailInput.value
  const slack_username = slackUsername.value
  const mod_name = modName.value

  fetch('http://localhost:3000/users',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    name,
    email,
    mod_name,
    slack_username
    })
  }).then(resp=>resp.json())
  .then(user => {

    BackendAPI.createRating(user.id, 1, arraySliders[0].getValue())
    BackendAPI.createRating(user.id, 2, arraySliders[6].getValue())
    BackendAPI.createRating(user.id, 3, arraySliders[2].getValue())
    BackendAPI.createRating(user.id, 4, arraySliders[3].getValue())
    BackendAPI.createRating(user.id, 5, arraySliders[5].getValue())
    BackendAPI.createRating(user.id, 6, arraySliders[4].getValue())
    BackendAPI.createRating(user.id, 7, arraySliders[1].getValue())
  }).then(()=> {location.reload()})

}

document.addEventListener('DOMContentLoaded', () => {
  createSliders()
  document.getElementById('sign-up-button').addEventListener('click', toggleForm)
  document.getElementById('close-button').addEventListener('click', toggleForm)
  document.getElementById('create-new-user-submit').addEventListener('click', createUser)
  let userList
  fetch(BackendAPI.USERS_URL).then(res => res.json())
    .then(users => SlackAPI.getMembers().then(slackUsers => userList = new UserList(users, slackUsers)))
    .then(() => userList.appendUsers())
});

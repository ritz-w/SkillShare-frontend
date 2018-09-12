const BASE_URL = "http://localhost:3000/users"
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

function toggleForm() {
  var x = document.querySelector('div.sign-up-form')
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function sayHi() {
  console.log("hi")
}

function addRating(user_id, user_skill_id, skill_id, rating){
            fetch(`http://localhost:3000/user_skills/${user_skill_id}`,{
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({
rating: rating,
})
}).then(resp=>resp.json())
}

function createRating(user_id, skill_id, rating){
    return fetch(`http://localhost:3000/user_skills`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        user_id: user_id,
        skill_id: skill_id,
        rating: rating
    })
   }).then(resp=>resp.json())
}


function addNewUser() {
  fetch(BASE_URL, {
    method: 'POST',

  }).then(res => res.json())
  .then(json => json.forEach(user => new User(user)))
}


function createUser(){
  const nameInput = document.getElementById('inputName').value
  const emailInput = document.getElementById('inputEmail').value
  const slackUsername = document.getElementById('slack_username').value
  const modName = document.getElementById('inputModule').value
  const arRating = arraySliders[0].getValue()
  const reactRating = arraySliders[1].getValue()
  const railsRating = arraySliders[2].getValue()
  const sinRating = arraySliders[3].getValue()
  const jsRating = arraySliders[4].getValue()
  const sqlRating = arraySliders[5].getValue()
  const rubyRating = arraySliders[6].getValue()

  fetch('http://localhost:3000/users',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    name: nameInput,
    email: emailInput,
    mod_name: modName,
    slack_username: slackUsername
    })
  }).then(resp=>resp.json())
  .then(json => { console.log(json)
    createRating(json.id, 1, arRating)
    createRating(json.id, 2, rubyRating)
    createRating(json.id, 3, railsRating)
    createRating(json.id, 4, sinRating)
    createRating(json.id, 5, sqlRating)
    createRating(json.id, 6, jsRating)
    createRating(json.id, 7, reactRating)
  }).then(()=> {location.reload()})

}

document.addEventListener('DOMContentLoaded', () => {
  createSliders()
  document.getElementById('sign-up-button').addEventListener('click', toggleForm)
  document.getElementById('close-button').addEventListener('click', toggleForm)
  document.getElementById('create-new-user-submit').addEventListener('click', createUser)
  let userList
  fetch(BASE_URL).then(res => res.json())
    .then(users => SlackAPI.getMembers().then(slackUsers => userList = new UserList(users, slackUsers)))
    .then(() => userList.appendUsers())
});

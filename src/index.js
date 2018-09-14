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
const personalTag = document.getElementById('tagline')
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
  const tagline = personalTag.value
  const mod_name = modName.value

  fetch('http://localhost:3000/users',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    name,
    email,
    mod_name,
    tagline
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

function searchUsers() {
    const nameFieldValue = document.getElementById('search-field').value
    console.log(userList.users)
    console.log(userList.filterUsersByName(nameFieldValue))
    userList.filterUsersByName(nameFieldValue)
    userList.appendUsers(userList.filteredUsers)
}

function toggleFireworks() {
  if (document.getElementById('canvas').style.display === "none" || document.getElementById('canvas').style.display === "") {
    document.getElementById('canvas').style.display = "block"
    document.getElementById('cards-container').style.display = "none"
    console.log(document.getElementById('canvas').style.display)
  } else if (document.getElementById('canvas').style.display === "block") {
    document.getElementById('canvas').style.display = "none"
    document.getElementById('cards-container').style.display = "block"
    console.log(document.getElementById('canvas').style.display)
  }
}
document.addEventListener('DOMContentLoaded', () => {
  createSliders()
  document.getElementById('sign-up-button').addEventListener('click', toggleForm)
  document.getElementById('page-header').addEventListener('mouseover', toggleFireworks)
  document.getElementById('page-header').addEventListener('mouseout', toggleFireworks)
  document.getElementById('close-button').addEventListener('click', toggleForm)
  document.getElementById('create-new-user-submit').addEventListener('click', createUser)
  document.getElementById('submit-search').addEventListener('click', searchUsers)
  let userList
  fetch(BackendAPI.USERS_URL).then(res => res.json())
    .then(users => SlackAPI.getMembers().then(slackUsers => {
      userList = new UserList(users, slackUsers)
      window.userList = userList
    }))
    .then(() => {userList.appendUsers(userList.users)
      document.getElementById('showAll').addEventListener('click', () => {
        userList.appendUsers(userList.users)
      })
    })
    .then(() => {
      BackendAPI.createSkillOptions(userList)
    })
});

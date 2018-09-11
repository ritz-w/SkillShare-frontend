const BASE_URL = "http://localhost:3000/users"


function createSliders() {
  a = [...document.getElementsByClassName('form-slider')]
  a.forEach( sliderElem => {
    new Slider(sliderElem, {
  	formatter: function(value) {
  		return 'Current value: ' + value;
    	}
    })
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


document.addEventListener('DOMContentLoaded', () => {
  createSliders()
  document.getElementById('sign-up-button').addEventListener('click', toggleForm)
  document.getElementById('close-button').addEventListener('click', toggleForm)
  fetch(BASE_URL).then(res => res.json())
  .then(json => json.forEach(userData => new User(userData)))
});

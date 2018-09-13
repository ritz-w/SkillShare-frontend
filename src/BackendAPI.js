class BackendAPI {

  static createRating(user_id, skill_id, rating){
      return fetch(BackendAPI.USER_SKILLS_URL,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          user_id: user_id,
          skill_id: skill_id,
          rating: rating
      })
     }).then(resp=>resp.json())
  }


  // static addNewUser(user) {
  //   fetch(BackendAPI.USERS_URL, {
  //     method: 'POST',
  //
  //   }).then(res => res.json())
  //   .then(json => json.forEach(user => new User(user)))
  // }


  static createUser(){
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

    fetch(BackendAPI.USERS_URL, {
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

  // static findSkills(skillId) {
  //   fetch(`${BackendAPI.SKILLS_URL}/${skillId}`)
  //   .then(res => res.json())
  //   .then(skillInfo => {
  //     skillInfo.user_skills.filter(skill => skill.rating > 75)
  //   })
  // }

  static createSkillOptions(userList) {
    fetch(BackendAPI.SKILLS_URL)
    	.then(resp => resp.json())
    	.then(skills => {
        skills.forEach(skill => {
            const divElement = document.createElement('div')
            divElement.innerHTML = `
            <div class="form-group">
              <a class="dropdown-item">${skill.name}</a>
            </div>
            `
            divElement.addEventListener('click', () => {
              userList.filterUsersBySkill(skill.name)
              userList.appendUsers(userList.filteredUsers)
            })
            document.getElementById('skills-list').append(divElement)

        })
    	}
    )}
}

BackendAPI.BASE_URL = "http://localhost:3000"
BackendAPI.USERS_URL = BackendAPI.BASE_URL + "/users"
BackendAPI.USER_SKILLS_URL = BackendAPI.BASE_URL + "/user_skills"
BackendAPI.SKILLS_URL = BackendAPI.BASE_URL + "/skills"

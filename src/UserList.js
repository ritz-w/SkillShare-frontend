class UserList {
  constructor(users, slackUsers) {
    this.users = users
    this.filteredUsers = []
    this.londonSlackUsers = this.getLondonSlackUsers(slackUsers)
    this.mod5 = document.getElementById('060418')
    this.mod3 = document.getElementById('071618')
    this.mod1 = document.getElementById('082818')
  }

  showHeaders() {
    if (this.mod5.innerHTML === ""){
      this.mod5.previousElementSibling.style.display = "none"
    } else {
      this.mod5.previousElementSibling.style.display = "block"
    }
    if (this.mod3.innerHTML === ""){
      this.mod3.previousElementSibling.style.display = "none"
    } else {
      this.mod3.previousElementSibling.style.display = "block"
    }
    if (this.mod1.innerHTML === ""){
      this.mod1.previousElementSibling.style.display = "none"
    } else {
      this.mod1.previousElementSibling.style.display = "block"
    }
  }

  getLondonSlackUsers(slackUsers) {
    return slackUsers.filter(member => member.tz_label === "British Summer Time")
  }

  appendUsers(users) {
    this.mod5.innerHTML = ""
    this.mod3.innerHTML = ""
    this.mod1.innerHTML = ""
    users.forEach( user => this.appendUser(user))
    this.showHeaders()
  }


  appendUser(user) {
    const newUserInstance = new User(user)
    const foundSlackUser = this.londonSlackUsers.find(user => user.real_name.includes(newUserInstance.name))
    if (!!foundSlackUser.profile.image_original === false) {
      newUserInstance.photo = 'http://tapatiarestaurant.com/wp-content/uploads/2015/10/blank__240x240.gif'
    } else {
      newUserInstance.photo = foundSlackUser.profile.image_original
    }
    newUserInstance.slackTeamId = foundSlackUser.team_id
    newUserInstance.slackId = foundSlackUser.id
    newUserInstance.getPresence()
    const newCard = document.createElement('div')
    newCard.className = "user-card"
    newCard.innerHTML = newUserInstance.render()
    document.getElementById(newUserInstance.module).appendChild(newCard)
  }

  filterUsersBySkill(skillName) {
    const filteredSkillUsers = this.users.filter(user => {
      const foundSkill = user.user_skills.find(skill => skill.skill.name === skillName)
      return foundSkill && foundSkill.rating > 75 ? true : false
    })
    this.filteredUsers = filteredSkillUsers
    return filteredSkillUsers
  }

  filterUsersByName(name) {
    const filteredNameUsers = this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
    this.filteredUsers = filteredNameUsers
    return filteredNameUsers
  }



}

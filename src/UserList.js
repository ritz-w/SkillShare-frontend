class UserList {
  constructor(users, slackUsers) {
    this.users = users
    this.londonSlackUsers = this.getLondonSlackUsers(slackUsers)
    this.mod5 = document.getElementById('060418')
    this.mod3 = document.getElementById('071618')
    this.mod1 = document.getElementById('082818')
  }

  getLondonSlackUsers(slackUsers) {
    return slackUsers.filter(member => member.tz_label === "British Summer Time")
  }

  appendUsers() {
    this.users.forEach( user => this.appendUser(user))
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


}

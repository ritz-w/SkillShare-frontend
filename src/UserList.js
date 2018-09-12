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
    newUserInstance.photo = foundSlackUser.profile.image_original
    newUserInstance.slackTeamId = foundSlackUser.team_id
    newUserInstance.slackId = foundSlackUser.id
    const newCard = document.createElement('div')
    newCard.className = "user-card"
    newCard.innerHTML = `<h3>${newUserInstance.name}</h3><img class="profile-pic" src="${newUserInstance.photo}" />
    <br>
    <a href="mailto:${newUserInstance.email}">Email / </a>
    <a href="slack://user?team=${newUserInstance.slackTeamId}&id=${newUserInstance.slackId}">Slack ${newUserInstance.name}</a>
    <ul id="skills-list">
    <li>ActiveRecord: ${newUserInstance.ARrating}%</li>
    </ul>`
    console.log(newUserInstance)
    document.getElementById(newUserInstance.module).appendChild(newCard)
  }


}

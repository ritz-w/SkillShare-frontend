const allUsers = []

class User {
  constructor(userData) {
    this.id = userData.id
    this.name = userData.name
    this.module = userData.mod_name
    this.email = userData.email
    this.tagline = userData.tagline
    this.skills = userData.user_skills
    this.presence = 'Loading...'
    allUsers.push(this)
  }

  render() {
    return `
      <h3>${this.name}</h3>
      <p id="active-${this.id}">${this.presence}</p>
      <img class="profile-pic" src="${this.photo}" />
      <br>
      <p><i>${this.tagline}</i></p>
      <ul id="skills-list">
        ${this.renderSkills()}
      </ul>
      <a href="mailto:${this.email}">Email / </a>
      <a href="slack://user?team=${this.slackTeamId}&id=${this.slackId}">Slack ${this.name}</a>
    `
  }

  renderSkills() {
    let html = ''
    this.skills.forEach(skillInfo => {
      html += `<li>${skillInfo.skill.name}: ${skillInfo.rating}%</li>`
    })
    return html
  }

  getPresence() {
    SlackAPI.getPresence(this.slackId)
    .then(presence => {
      this.presence = presence
      document.getElementById(`active-${this.id}`).innerHTML = `${this.presence}`
    })
  }

}

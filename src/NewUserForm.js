class UserForm {
  constructor() {
    this.nameInput = document.getElementById('inputName').value
    this.emailInput = document.getElementById('inputEmail').value
    this.slackUsername = document.getElementById('slack_username').value
    this.modName = document.getElementById('inputModule').value
    this.arRating = arraySliders[0].getValue()
    this.reactRating = arraySliders[1].getValue()
    this.railsRating = arraySliders[2].getValue()
    this.sinRating = arraySliders[3].getValue()
    this.jsRating = arraySliders[4].getValue()
    this.sqlRating = arraySliders[5].getValue()
    this.rubyRating = arraySliders[6].getValue()
  }
}

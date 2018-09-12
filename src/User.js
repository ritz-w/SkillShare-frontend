class User {
  constructor(userData) {
    this.id = userData.id
    this.name = userData.name
    this.module = userData.mod_name
    this.email = userData.email
    this.slack_username = userData.slack_username
    this.getSkills()
  }

  getSkills() {
    fetch(`http://localhost:3000/users/${this.id}`).then(res => res.json())
    .then(json => {
      const ratings = json.user_skills.map(us => us.rating)
      this.ARrating = ratings[0]
      this.RubyRating = ratings[1]
      this.RailsRating = ratings[2]
      this.SinatraRating = ratings[3]
      this.SQLRating = ratings[4]
      this.JSRating = ratings[5]
      this.ReactRating = ratings[6]
    })
  }

}

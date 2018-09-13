const token = "xoxp-2727337933-396245213616-434646889620-91c14f1091dfa0801da1d500d74ff0c3"


class SlackAPI {
  static getMembers() {
      return fetch(`https://slack.com/api/users.list?token=${token}&include_locale=true&pretty=1`)
        .then(res => res.json())
        .then(json => json.members)
  }

  static getPresence(id) {
    return fetch(`https://slack.com/api/users.getPresence?token=${token}&user=${id}&pretty=1`)
    .then(res => res.json())
    .then(userStatus => userStatus.presence)
  }

}

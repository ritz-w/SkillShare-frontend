class SlackAPI {
  static getMembers() {
      return fetch('https://slack.com/api/users.list?token=xoxp-2727337933-396245213616-433514548016-f9c2da650fd195d7485f3ce4abd3ea00&include_locale=true&pretty=1')
        .then(res => res.json())
        .then(json => json.members)
  }

  static getPresence(id) {
    return fetch(`https://slack.com/api/users.getPresence?token=xoxp-2727337933-396245213616-433514548016-f9c2da650fd195d7485f3ce4abd3ea00&user=${id}&pretty=1`)
    .then(res => res.json())
    .then(userStatus => userStatus.presence)
  }

}

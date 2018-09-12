class SlackAPI {
  static getMembers() {
      return fetch('https://slack.com/api/users.list?token=xoxp-2727337933-396245213616-435317834006-284d8b3e4e70ae9b01ca76cae2bb1ad3&include_locale=true&pretty=1')
        .then(res => res.json())
        .then(json => json.members)
  }

}

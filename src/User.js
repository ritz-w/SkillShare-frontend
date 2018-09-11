class User{
  constructor(userData) {
    this.name = userData.username
    this.createCard()
  }

  createCard() {
    const newCard = document.createElement('div')
    newCard.className = "user-card"
    newCard.innerHTML = `<h3>${this.name}</h3>`
    document.getElementById('071618').appendChild(newCard)
  }
}

// 放在文件最上方，定義所有遊戲狀態
const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
}

// 圖案
const Symbols = [
  'https://image.flaticon.com/icons/svg/105/105223.svg', // 黑桃
  'https://image.flaticon.com/icons/svg/105/105220.svg', // 愛心
  'https://image.flaticon.com/icons/svg/105/105212.svg', // 方塊
  'https://image.flaticon.com/icons/svg/105/105219.svg' // 梅花
]


const view = {
  getCardElement(index) {
    return `
    <div data-index="${index}" class="card back"></div>
    `
  },
  getCardContent(index) {
    const number = this.transformNumber(index % 13 + 1)
    const symbol = Symbols[Math.floor(index / 13)]
    return `
    <p> ${number}</p>
    <img src="${symbol}"/>
    <p>${number}</p>
    `
  },

  transformNumber(number) {
    switch (number) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return number
    }
  },

  filpCards(...cards) {
    cards.map(card => {
      if (card.classList.contains('back')) {
        // 回傳正面
        card.classList.remove('back')
        card.innerHTML = this.getCardContent(Number(card.dataset.index))
        return
      }
      // 回傳背面
      card.classList.add('back')
      card.innerHTML = null
    })

  },


  displayCards(indexes) {
    const rootElement = document.querySelector("#cards")
    rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join("")
  },

  pairCards(...cards) {
    cards.map(card => {
      card.classList.add('paired')
    })
  },
  renderScore(score) {
    document.querySelector('.score').innerText = `Score: ${score}`
  },
  renderTriedTimes(times) {
    document.querySelector('.tried').innerText = `You've tried: ${times} times`
  },
  appendWrongAnimation(...cards) {
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener('animationend', event =>
        event.target.classList.remove('wrong')), { once: true }
    })
  },
  showGameFinished() {
    const div = document.createElement('div')
    div.classList.add('completed')
    div.innerHTML = `
      <p>Complete!</p>
      <p>Score: ${model.score}</p>
      <p>You've tried: ${model.triedTimes} times</p>
    `
    const header = document.querySelector('#header')
    header.before(div)
  }
}


// Model 是管理資料的地方
const model = {
  revealedCards: [],


  // 檢查點擊的卡片，其 index 除於 13 的餘數是否相同
  isRevealCardsMatched() {
    return model.revealedCards[0].dataset.index % 13 === model.revealedCards[1].dataset.index % 13
  },
  score: 0,
  triedTimes: 0
}


// 標記目前的遊戲狀態，初始為還未翻牌
const controller = {
  currentState: GAME_STATE.FirstCardAwaits,  // 加在第一行
  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52))
  },
  dispatchCardAction(card) {
    if (!card.classList.contains("back")) {
      return
    }
    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.filpCards(card)
        model.revealedCards.push(card)
        this.currentState = GAME_STATE.SecondCardAwaits
        break // 讓程式能跳過這個，繼續往下跑

      case GAME_STATE.SecondCardAwaits:
        view.renderTriedTimes(++model.triedTimes)
        view.filpCards(card)
        model.revealedCards.push(card)
        //判斷配對是否成功
        // 如果 model.isRevealCardsMatched 是 true 的話
        if (model.isRevealCardsMatched()) {
          view.renderScore(model.score += 10)
          this.currentState = GAME_STATE.CardsMatched
          view.pairCards(...model.revealedCards)
          model.revealedCards = []
          if (model.score === 260) {
            console.log('showGameFinished')
            this.currentState = GAME_STATE.GameFinished
            view.showGameFinished()
            return
          }
          this.currentState = GAME_STATE.FirstCardAwaits
        } else {
          //配對失敗
          this.currentState = GAME_STATE.CardsMatchFailed
          view.appendWrongAnimation(...model.revealedCards)
          setTimeout(this.resetCards, 1000)
        }
        break
    }

  },
  resetCards() {
    view.filpCards(...model.revealedCards)
    model.revealedCards = []
    controller.currentState = GAME_STATE.FirstCardAwaits
  }
}


/* 建立 utility 來存放這個演算法，類似外掛函式庫 */
const utility = {
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
        ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  }
}

controller.generateCards() //取代 view.displayCards()


document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", event => {
    controller.dispatchCardAction(card)
  })
})




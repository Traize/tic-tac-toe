import { restartGame, startGame } from "./gameBoard.js"
const startBtn = document.querySelector('.start-btn')
const restartBtn = document.querySelector('.restart-btn')
const cells = document.querySelectorAll('.cell')



startBtn.onclick = () => {
    startGame()
    startBtn.innerText = `Начать игру`
    startBtn.style.display = `none`
    restartBtn.style.display = `flex`
}

restartBtn.onclick = () => {
    restartGame()
}

import { getCurrentPlayerFromStorage, getDataFromStorage, setCurrentPlayerToStorage, setDataToStorage, setGameModeToStorage } from "./localStorage.js"
import { winCondition } from "./misc.js"

const gameWindow = document.querySelector('.game-content')
const currentPlayer = document.querySelector('.current-player')

let player = getCurrentPlayerFromStorage()

let players = ["x", "o"]

currentPlayer.innerText = player.toUpperCase()

// Отрисовка поля для игры
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('position', i)
    gameWindow.append(cell)
}

const cells = document.querySelectorAll('.cell')

getDataFromStorage(players)

// Функция для игры PVP
function pvpGame(cell) {
    let data = []
    if (!cell.innerText) {
        cell.innerText = player
    } else return

    for (let i in cells) {
        if (cells[i].innerText === player) {
            data.push(parseInt(cells[i].getAttribute('position')))
        }
    }

    if (!checkEmpty()) {
        const gameInfo = document.querySelector('.game-info')
        const win = document.createElement('div')

        win.classList.add('player-win')
        win.innerText = `Ничья`
        gameInfo.append(win)

        for (let i = 0; i < 9; i++) {
            cells[i].onclick = (e) => { e.preventDefault() }
        }
        players.forEach(item => {
            localStorage.removeItem(`game-session-${item}`)
        })
        localStorage.removeItem('player')
    } else {
        if (checkWinCondition(data)) {
            const gameInfo = document.querySelector('.game-info')
            const win = document.createElement('div')

            win.classList.add('player-win')
            win.innerText = `Выиграл игрок: ${player.toUpperCase()}`
            gameInfo.append(win)

            for (let i = 0; i < 9; i++) {
                cells[i].onclick = (e) => { e.preventDefault() }
            }
            players.forEach(item => {
                localStorage.removeItem(`game-session-${item}`)
            })
            localStorage.removeItem('player')

        } else {
            setDataToStorage(data, player)
            player = player === 'x' ? 'o' : 'x'
            setCurrentPlayerToStorage(player)
            currentPlayer.innerText = player.toUpperCase()
        }
    }
}

// Ф-ция проверки победы
function checkWinCondition(data) {
    for (let i in winCondition) {
        let win = true
        for (let j in winCondition[i]) {
            let id = winCondition[i][j]
            let indx = data.indexOf(id)
            if (indx == -1) {
                win = false
            }
        }
        if (win) {
            return true
        }
    }
    return false
}



// Запуск игры в зависимости от выбранного режима
export function startGame() {
    const diff = document.querySelector('.choose-diff')
    const currentDiff = document.querySelector('.diff-title')

    switch (diff.value) {
        case 'PvP':
            for (let i = 0; i < 9; i++) {
                cells[i].onclick = () => { pvpGame(cells[i]) }
            }
            currentDiff.style.display = 'flex'
            currentDiff.style.fontSize = '18px'
            currentDiff.innerText = `Текущая сложность: игрок против игрока`
            setGameModeToStorage(diff)
            break;
        case 'soft':
            for (let i = 0; i < 9; i++) {
                cells[i].onclick = () => { softGame(cells[i]) }
            }
            currentDiff.style.display = 'flex'
            currentDiff.style.fontSize = '18px'
            currentDiff.innerText = `Текущая сложность: игрок против ии(слабый)`
            setGameModeToStorage(diff)
            break;
    }
}


export function restartGame() {
    if (document.querySelector('.player-win')) {
        document.querySelector('.player-win').remove()
    }

    players.forEach(item => {
        localStorage.removeItem(`game-session-${item}`)
    })
    localStorage.removeItem('player')
    localStorage.removeItem('game-mode')
    getDataFromStorage(players)
    clearBoard()
    player = getCurrentPlayerFromStorage()
    currentPlayer.innerText = player.toUpperCase()
    startGame()
}

function clearBoard() {
    cells.forEach(item => item.innerText = '')
}


function softGame(cell) {
    let data = []
    let aiData = []
    // ходы для игрока
    if (player === 'x') {
        if (!cell.innerText) {
            cell.innerText = player
        } else return
        for (let i in cells) {
            if (cells[i].innerText === player) {
                data.push(parseInt(cells[i].getAttribute('position')))
            }
        }
        checkWinWithAi(data)
    }

    if (player === 'o') {
        let availabelCells = []
        for (let i in cells) {
            if (cells[i].innerText === '') {
                availabelCells.push(i)
            }
        }
        if (!checkEmpty()) {
            const gameInfo = document.querySelector('.game-info')
            const win = document.createElement('div')

            win.classList.add('player-win')
            win.innerText = `Ничья`
            gameInfo.append(win)

            for (let i = 0; i < 9; i++) {
                cells[i].onclick = (e) => { e.preventDefault() }
            }
            players.forEach(item => {
                localStorage.removeItem(`game-session-${item}`)
            })
            localStorage.removeItem('player')
            localStorage.removeItem('game-mode')
        } else {
            let random = Math.floor(Math.random() * availabelCells.length)
            cells[availabelCells[random]].innerText = player
            for (let i in cells) {
                if (cells[i].innerText === player) {
                    aiData.push(parseInt(cells[i].getAttribute('position')))
                }
            }
            checkWinWithAi(aiData)

        }
    }

}


function checkWinWithAi(array) {
    if (checkWinCondition(array)) {
        const gameInfo = document.querySelector('.game-info')
        const win = document.createElement('div')

        win.classList.add('player-win')
        win.innerText = `Выиграл игрок: ${player.toUpperCase()}`
        gameInfo.append(win)

        for (let i = 0; i < 9; i++) {
            cells[i].onclick = (e) => { e.preventDefault() }
        }
        players.forEach(item => {
            localStorage.removeItem(`game-session-${item}`)
        })
        localStorage.removeItem('game-mode')
        localStorage.removeItem('player')
    } else {

        setDataToStorage(array, player)
        player = player === 'x' ? 'o' : 'x'
        currentPlayer.innerText = player.toUpperCase()
    }
}

function checkEmpty() {
    let emptyCells = []
    for (let i in cells) {
        if (cells[i].innerText === '') {
            emptyCells.push(i)
        }
    }
    return emptyCells.length != 0 ? true : false
}


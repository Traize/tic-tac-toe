export function getDataFromStorage(players) {
    getGameModeFromStorage()
    players.forEach(item => {
        if (localStorage.getItem(`game-session-${item}`)) {
            const playerMoves = JSON.parse(localStorage.getItem(`game-session-${item}`))
            const cells = document.querySelectorAll('.cell')
            for (let i in cells) {
                if (playerMoves[1].includes(parseInt(i))) {
                    cells[i].innerText = item
                }
            }
        }
    })

}

export function setDataToStorage(data, player) {
    localStorage.setItem(`game-session-${player}`, JSON.stringify([player, data]))
}

export function getCurrentPlayerFromStorage() {

    if (localStorage.getItem('player')) {
        return JSON.parse(localStorage.getItem('player'))
    } else return 'x'

}

export function setCurrentPlayerToStorage(player) {
    localStorage.setItem('player', JSON.stringify(player))
}

export function setGameModeToStorage(diff) {
    localStorage.setItem('game-mode', JSON.stringify(diff.value))
}

function getGameModeFromStorage() {
    if (localStorage.getItem('game-mode')) {
        const diff = JSON.parse(localStorage.getItem('game-mode'))
        const select = document.querySelector('.choose-diff')
        const currentDiff = document.querySelector('.diff-title')
        const startBtn = document.querySelector('.start-btn')
        startBtn.innerText = `Продолжить игру`
        switch (diff) {
            case 'PvP':
                currentDiff.style.display = 'flex'
                currentDiff.style.fontSize = '18px'
                currentDiff.innerText = `Текущая сложность: игрок против игрока`
                select.value = diff
                break;
            case 'soft':
                currentDiff.style.display = 'flex'
                currentDiff.style.fontSize = '18px'
                currentDiff.innerText = `Текущая сложность: игрок против ии(слабый)`
                select.value = diff
                break;
            case 'hard':
                currentDiff.style.display = 'flex'
                currentDiff.style.fontSize = '17px'
                currentDiff.innerText = `Текущая сложность: игрок против ии(сильный)`
                select.value = diff
                break;



        }
    }
}
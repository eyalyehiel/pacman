'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🧁'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodCount
var gWinMsg
var gCherryInterval

function init() {
    var elDiv = document.querySelector('.game-over')
    elDiv.style.display = 'none'


    gGame.isOn = true
    gGame.score = 0
    gFoodCount = 0
    gBoard = buildBoard()
    gWinMsg = 'Game Over'
    
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry,15000)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            } else if (i === 1 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD
            } else {
                board[i][j] = FOOD
                gFoodCount++
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    var elDiv = document.querySelector('.game-over')
    var elSpan = elDiv.querySelector('span')

    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)

    elDiv.style.display = 'block'
    elSpan.innerHTML = gWinMsg
}

function addCherry() {
    var pos = getEmptyCell()
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
}
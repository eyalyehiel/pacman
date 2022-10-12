'use strict'

const PACMAN = '😷';
var gPacman;
var tempGhostColor = []
var deadGhosts = []
var deg = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--
        // console.log(gFoodCount);
        if (gFoodCount === 1) {
            gWinMsg = 'You Won'
            gameOver()
        }
    } else if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        console.log('SUPER MODE!')
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
        }, 5000)
    } else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    deadGhosts.push(gGhosts.splice(i, 1)[0])
                    console.log('GHOST KILLED!')
                    setTimeout(() => {
                        gGhosts.push(deadGhosts.pop())
                    }, 5000)
                }
            }
            renderCell(gPacman.location, PACMAN)
        } else {
            gameOver()
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, getPacmanHTML(deg))
}

function getNextLocation(eventKeyboard) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            deg = 0
            nextLocation.i--;
            break;
        case 'ArrowDown':
            deg = 180
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            deg = 270
            nextLocation.j--;
            break;
        case 'ArrowRight':
            deg = 90
            nextLocation.j++;
            break;
        default:
            return null;
    }
    renderCell(gPacman.location, getPacmanHTML(deg))
    return nextLocation;
}


function getPacmanHTML(deg) {
    return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}
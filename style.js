// style.js
const statusDisplay = document.querySelector('.game-status') // game status to use later

// game state variables
let gameActive = true; // pause capapbility in end scenario

// change to color names to make things easier on the users
let currentPlayer = 'Red'; // current player to keep track of turns

let gameState = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
] // game state to track all of the cells in the grid

// UI cols
const colOne = document.querySelectorAll('.col-1');
const colTwo = document.querySelectorAll('.col-2');
const colThree = document.querySelectorAll('.col-3');
const colFour = document.querySelectorAll('.col-4');
const colFive = document.querySelectorAll('.col-5');
const colSix = document.querySelectorAll('.col-6');
const colSeven = document.querySelectorAll('.col-7');

// six long

// messages to users
const winningMessage = () => `${currentPlayer} has won!` // win message
const drawMessage = () => 'Game ended in a draw!' // draw message
const currentPlayerTurn = () => `It's ${currentPlayer}\'s turn!` // whose turn message

// dispay turn message at start
statusDisplay.innerHTML = currentPlayerTurn();

// game functions
function handleColPlayed(clickedColIndex) {
    // update game state and user interface to reflect played move
    for (let i = 5; i >= 0; i--) {
        if (gameState[clickedColIndex][i] !== "") {
            continue
        } else {
            if (clickedColIndex == 0) {
                colOne[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } else if (clickedColIndex == 1) {
                colTwo[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } else if (clickedColIndex == 2) {
                colThree[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } else if (clickedColIndex == 3) {
                colFour[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } else if (clickedColIndex == 4) {
                colFive[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } else if (clickedColIndex == 5) {
                colSix[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } else {
                colSeven[i].className += ` ${currentPlayer}`
                gameState[clickedColIndex][i] = currentPlayer;
            } // end if
        } // end if
        return
    } // end for
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "Red" ? "Yellow" : "Red";
    statusDisplay.innerHTML = currentPlayerTurn(); // change status display to reflect change of turn
}

// column configurations that constitute a win
const winningConditions = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6]
];

function handleResultValidation() {
    let roundWon = false;
    // column check
    for (let i = 0; i <= 6; i++) {
        // traverse each column individually
        const column = gameState[i];
        for (let j = 0; j <= 2; j++) {
            const winCondition = winningConditions[j]; // grab each win condition one by one

            // grab the cells four at a time within the column
            let a = column[winCondition[0]];
            let b = column[winCondition[1]];
            let c = column[winCondition[2]];
            let d = column[winCondition[3]];

            // check if they're all played
            if (a === '' || b === '' || c === '' || d === '') {
                continue;
            } // end if

            // check if all of them match
            if (a === b && b === c && c === d) {
                roundWon = true; // if they match then the round is won
                break
            } // end if
        }
    } // end for

    // row check
    let row = []; // assemble the rows
    for (let i = 0; i <= 5; i++) {
        row = [];
        for (let j = 0; j <= 6; j++) {
            row.push(gameState[j][i]);
        }
        for (let k = 0; k <= 3; k++) {
            const winCondition = winningConditions[k] // grab each win condition individually

            // grab the cells four at a time with the row
            let a = row[winCondition[0]];
            let b = row[winCondition[1]];
            let c = row[winCondition[2]];
            let d = row[winCondition[3]];

            // check if they're all played
            if (a === '' || b === '' || c === '' || d === '') {
                continue;
            } // end if

            // check if all of them match
            if (a === b && b === c && c === d) {
                roundWon = true; // if they match then the round is won
                break
            } // end if
        }

    }

    // diagonal check
    let fourDiags = [
        [gameState[0][3], gameState[1][2], gameState[2][1], gameState[3][0]],
        [gameState[0][2], gameState[1][3], gameState[2][4], gameState[3][5]],
        [gameState[3][5], gameState[4][4], gameState[5][3], gameState[6][2]],
        [gameState[3][0], gameState[4][1], gameState[5][2], gameState[6][3]]
    ]
    // win check
    for (let i = 0; i <= 3; i++) {
        const winCondition = winningConditions[0]
        // grab the cells four at a time within the diagonal
        let a = fourDiags[i][winCondition[0]];
        let b = fourDiags[i][winCondition[1]];
        let c = fourDiags[i][winCondition[2]];
        let d = fourDiags[i][winCondition[3]];

        // check if they're all played
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
        } // end if

        // check if all of them match
        if (a === b && b === c && c === d) {
            roundWon = true; // if they match then the round is won
            break
        } // end if
    }

    // five long diagonals (4)
    let fiveDiags = [
        [gameState[0][1], gameState[1][2], gameState[2][3], gameState[3][4], gameState[4][5]],
        [gameState[0][4], gameState[1][3], gameState[2][2], gameState[3][1], gameState[4][0]],
        [gameState[2][5], gameState[3][4], gameState[4][3], gameState[5][2], gameState[6][1]],
        [gameState[2][0], gameState[3][1], gameState[4][2], gameState[5][3], gameState[6][4]]
    ]
    // win check
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 1; j++) {
            const winCondition = winningConditions[j]
            // grab the cells four at a time within the diagonal
            let a = fiveDiags[i][winCondition[0]];
            let b = fiveDiags[i][winCondition[1]];
            let c = fiveDiags[i][winCondition[2]];
            let d = fiveDiags[i][winCondition[3]];

            // check if they're all played
            if (a === '' || b === '' || c === '' || d === '') {
                continue;
            } // end if

            // check if all of them match
            if (a === b && b === c && c === d) {
                roundWon = true; // if they match then the round is won
                break
            } // end if
        }
    }

    // six long diagonals (4)
    let sixDiags = [
        [gameState[0][5], gameState[1][4], gameState[2][3], gameState[3][2], gameState[4][1], gameState[5][0]],
        [gameState[0][0], gameState[1][1], gameState[2][2], gameState[3][3], gameState[4][4], gameState[5][5]],
        [gameState[1][5], gameState[2][4], gameState[3][3], gameState[4][2], gameState[5][1], gameState[6][0]],
        [gameState[1][0], gameState[2][1], gameState[3][2], gameState[4][3], gameState[5][4], gameState[6][5]]
    ]
    // win check
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            const winCondition = winningConditions[j]
            // grab the cells four at a time within the diagonal
            let a = sixDiags[i][winCondition[0]];
            let b = sixDiags[i][winCondition[1]];
            let c = sixDiags[i][winCondition[2]];
            let d = sixDiags[i][winCondition[3]];

            // check if they're all played
            if (a === '' || b === '' || c === '' || d === '') {
                continue;
            } // end if

            // check if all of them match
            if (a === b && b === c && c === d) {
                roundWon = true; // if they match then the round is won
                break
            } // end if
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(); // display win message
        gameActive = false; // pause the game
        return;
    } // end if

    // check if all cells have been filled
    let drawCheck = [];
    for (i = 0; i <= 6; i++) {
        drawCheck.push(gameState[i][0])
    }
    let roundDraw = !drawCheck.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage(); // display draw message if all cells played without a winner
        gameActive = false; // pause the game
        return;
    } // end if

    // if no winner and no draw change the player for next turn
    handlePlayerChange();
}

function handleColClick(clickedColEvent) {
    const clickedCol = clickedColEvent.target; // save element for use

    const clickedColIndex = parseInt(
        clickedCol.getAttribute('data-col-index') // grab the index from the cell
    ); // parse the string returned into an int

    if (gameState[clickedColIndex][0] !== "" || !gameActive) {
        return; // ignore the click if the cell has already been played or the game is paused
    }

    // continue otherwise
    handleColPlayed(clickedColIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true; // unpause the game
    currentPlayer = "Red"; // reset current player back to Red
    statusDisplay.innerHTML = currentPlayerTurn(); // display current player
    gameState = [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""]
    ] // empty the game state cells
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); // empty the cells in the UI
    document.querySelectorAll('.cell').forEach(cell => cell.className = "cell"); // reset the class to just cell;
}

// event listeners
document.querySelectorAll('.col-tab').forEach(col => col.addEventListener('click', handleColClick)); // click event on cells
document.querySelector('.game-restart').addEventListener('click', handleRestartGame); // click event on restart btn

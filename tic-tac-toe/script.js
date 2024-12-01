const mainBoard = document.getElementsByClassName("main-board")[0]
const board = document.getElementsByClassName("board")[0]
const cells = document.getElementsByClassName("cell")
const turn = document.getElementsByClassName("turn")[0]
const reset = document.getElementsByClassName("reset")[0]

let turnCount = 0

const winningCombinations = [
	[0, 1, 2], // top row
	[3, 4, 5], // middle row
	[6, 7, 8], // bottom row
	[0, 3, 6], // left column
	[1, 4, 7], // middle column
	[2, 5, 8], // right column
	[0, 4, 8], // diagonal top-left to bottom-right
	[2, 4, 6] // diagonal top-right to bottom-left
];

console.log("working")

let xSquares = []
let oSquares = []

let isOver = false

let turnPlayer = "X"

function resetFunc(isCalledFromGameOver) {
	console.warn((!isCalledFromGameOver === true))
	if (!(isCalledFromGameOver === true) && isOver) {return} else {console.log("resetting")}

	isOver = false

	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = ""
	}

	xSquares = []
	oSquares = []

	turnCount = 0
	turnPlayer = "X"
	turn.innerHTML = turnPlayer+"'s Turn"
}

for (let i = 0; i < cells.length; i++) {
	console.log(cells[i])
	cells[i].addEventListener("click", () => {
		console.log("hi")

		if  (isOver) {return}

		let playerSquares = turnPlayer === "X" ? xSquares : oSquares
		let opponentSquares = turnPlayer === "X" ? oSquares : xSquares

		if (playerSquares.includes(i) || opponentSquares.includes(i)) {
			console.log("cant place there")
			return
		}
		playerSquares.push(i)
		cells[i].innerHTML = turnPlayer

		if (winningCombinations.some(combination => 
			combination.every(square => playerSquares.includes(square))
		)) {
			console.log(turnPlayer + " wins");
			turn.innerHTML = turnPlayer + " Wins!";
			setTimeout(() => resetFunc(true), 3000)
			isOver = true	
			return;
		} else if (turnCount >= 8) {
			console.log("tie")
			turn.innerHTML = "Tie!"
			isOver = true
			setTimeout(() => resetFunc(true), 3000)
			return
		}

		turnPlayer = turnPlayer === "X" ? "O" : "X"
		turn.innerHTML = turnPlayer+"'s Turn"

		turnCount++
	})
}

reset.addEventListener("click", resetFunc)
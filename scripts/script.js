// DOM elements - to be named whatever the element ID is in HTML
const gameBoard = document.getElementById("stage");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

// Array of symbols that will be used for the cards
const symbols = ["🍎", "🍌", "🍍", "🍉", "🍊", "🍓"];
// Arrays to store the cards and flipped cards
let cards = [];
let flippedCards = [];
// Counter for matched pairs
let matchedPairs = 0;
// Variables for the timer
let timerInterval;
let startTime;

// This function shuffles the array of symbols -- https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

// This function creates a new card
const createCard = (symbol) => {
	// DOM creates new div element to represent the card
	const card = document.createElement("div");
	let cardFront = document.createElement("div");
	let cardBack = document.createElement("div");
	// class .card
	card.classList.add("card");
	card.appendChild(cardFront).classList.add("card_front");
	card.appendChild(cardBack).classList.add("card_back");
	// unique symbol for each card
	card.dataset.symbol = symbol;
	card.querySelector(".card_back").textContent = symbol;
	// card.textContent = symbol;
	// on click trigger the flipCard function
	// card.addEventListener('click', flipCard);
	// DOM creates new div element to represent the front of the card -- still need to create a fuction for flipCard
	return card;
};

// This function starts/resets the game
const startGame = () => {
	// DOM to clear the game board
	gameBoard.innerHTML = "";
	// reempty array to store cards
	cards = [];
	// reempty array to store flipped cards
	flippedCards = [];
	// counter for matched pairs
	matchedPairs = 0;
	// reset the timer
	clearInterval(timerInterval);
	// DOM to modify the timer display
	timerDisplay.textContent = "Time: 0s";
	// method to shuffle and duplicate the array of symbols
	const shuffledSymbols = shuffleArray([...symbols, ...symbols]);
	// This function takes the shuffled symbols and creates the cards for each symbol
	shuffledSymbols.forEach((symbol) => {
		const card = createCard(symbol);
		cards.push(card);
		gameBoard.appendChild(card);
	});
	// CardArray is for passing to the evaluator fuction compareCards
	cardArray = [];
	const getCards = document.querySelectorAll(".card");

	getCards.forEach((e) => {
		e.addEventListener("click", (e) => {
			flipCards(e); //flip this card over
			if (!cardArray.length || cardArray.length < 1) {
				//if card array is less than 1 or empty.
				cardArray[0] = e; //add this card to cardArray 1st index.
			} else {
				cardArray[1] = e; //add this card to cardArray 2nd index.
				compareCards(cardArray);
			}
		});
	});

	// start the timer variables
	startTime = Date.now();
	// setInterval to update the timer https://developer.mozilla.org/en-US/docs/Web/API/setInterval
	timerInterval = setInterval(updateTimer, 1000);
};

// This function updates the timer display
const updateTimer = () => {
	const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
	timerDisplay.textContent = `Time: ${elapsedTime}s`;
};

// Event listeners for the start and reset buttons
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", startGame);
//  Memory Match Script created by Kenan Cross & Durell Wilson
//

// cardArray = [];
// const getCards = document.querySelectorAll(".card");

// getCards.forEach((e) => {
// 	e.addEventListener("click", (e) => {
// 		flipCards(e); //flip this card over
// 		if (!cardArray.length || cardArray.length < 1) {
// 			//if card array is less than 1 or empty.
// 			cardArray[0] = e; //add this card to cardArray 1st index.
// 		} else {
// 			cardArray[1] = e; //add this card to cardArray 2nd index.
// 			compareCards(cardArray);
// 		}
// 	});
// });

const compareCards = (cardArray) => {
	let card1 = cardArray[0].childNode[0].textContent; //get value of card 1
	let card2 = cardArray[1].childNode[0].textContent; //get value of card 2

	if (card1 === card2) {
		//user chose wisely! hide the cards!
		hideCards(cardArray);
	} else {
		//user picked incorrectly, so flip the cards back down.
		cardArray.forEach((e) => {
			flipCards(e);
		});
	}
};

const flipCards = (card = "all") => {
	if (card === "all") {
		//if reset has been pushed, then flip all the cards back down.
		let flippedCards = document.querySelectorAll(".flipped");
		flippedCards.forEach((e) => {
			e.classList.toggle("flipped");
		});
	} else {
		card.classList.toggle("flipped");
	}
};

const hideCards = (cardArray) => {
	cardArray.forEach((e) => {
		e.classList.toggle("hidden");
	});
	let cardsHidden = document.querySelectorAll(".hidden");
	if (cardsHidden.length === 12) {
		endGame();
	} else {
		cardsHidden = "";
	}
};

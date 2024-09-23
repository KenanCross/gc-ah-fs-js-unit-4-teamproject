//  Memory Match Script created by Kenan Cross & Durell Wilson
//

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

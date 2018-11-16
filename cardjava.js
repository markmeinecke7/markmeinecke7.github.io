var set = [];
var numCards = 0;
var i = 0;
var right = 0;
var wrong = 0;

/* This function gets the form inputs and stores them in an array, clears the
form, then adds one to the number of cards in the set (and displays that). */
function forminput() {
	var input1 = document.getElementById("frontin").value;
	var input2 = document.getElementById("backin").value;

	set.push({"front": input1, "back": input2, "correct": false, "unanswered": true});

	document.getElementById("frontin").value = "";
	document.getElementById("backin").value = "";

	numCards += 1;
	document.getElementById("numcards").innerHTML = numCards;

	console.log(set);
	console.log(numCards);		
}

/* Function prompts the user to create a title for their completed study set,
puts their first input on the front of the first card, then displays the study
card section and hides the new set section. */
function createset() {
	if (numCards == 0) {
		alert("Please add cards to the study set before compiling it.")
	}
	else {
		var title = prompt("Create a title for your study set.");
		document.getElementById("settitle").innerHTML = title;

		document.getElementById("compiled").style.display = "block";

		document.getElementById("new").style.display = "none";

		refresh();
	}
}

/* If the user clicks on the card, this function will switch the card display
from the front side to the back side in the current element of the set array, 
and vice versa. */
function flipcard() {
	if (document.getElementById("display").innerHTML == set[i].front) {
		document.getElementById("display").innerHTML = set[i].back;
		document.getElementById("answer").innerHTML = "Answer:";
	}
	else {
		document.getElementById("display").innerHTML = set[i].front;
		document.getElementById("answer").innerHTML = "";
	} 
}

/* Reduces i by 1 if it is greater than 0, refreshes card to front parameter of
the ith element of set. */
function lastcard() {	
	if (i > 0) {
		i -= 1;
	}
	refresh();
}

/* Increases i by 1 if it is less than the length of the set array, refreshes 
card to front parameter of the ith element of set. */
function nextcard() {
	if (i < (set.length - 1)) {
		i += 1;
	}

	refresh();
}

/* If the user selects the right answer button, the number of right answers 
increases by one, the card is set to answered and correct, and then the card is
refreshed to accomodate the parameters that have been changed. */
function rightans() {
	right += 1;
	set[i].unanswered = false;
	set[i].correct = true;

	refresh();
}

/* If the user selects the wrong answer button, the number of wrong answers 
increases by one, the card is set to answered and incorrect, and then the card is
refreshed to accomodate the parameter changes. */
function wrongans() {
	wrong += 1;
	set[i].unanswered = false;
	set[i].correct = false;

	refresh();
}

/* This function refreshes the card- it sets the display of the card to be the 
front value, displays the number of the card in the set, then checks to see if
the card is answered, correct, or incorrect, and then changes the display 
accordingly. */
function refresh() {
	var ansButtons = document.getElementsByClassName("rightwrong");
	var displayAns = document.getElementById("displayans");

	document.getElementById("display").innerHTML = set[i].front;
	document.getElementById("cardnumi").innerHTML = i + 1;
	document.getElementById("answer").innerHTML = "";

	if (set[i].unanswered == false) {
		for (x=0; x<ansButtons.length; x+=1) {
			ansButtons[x].style.display = "none";
		}

		if (set[i].correct == true) {
			displayAns.innerHTML = "You got this card RIGHT";
			displayAns.style.color = "rgb(5, 142, 21)";
			displayAns.style.display = "block";
		}
		else if (set[i].correct == false) {
			displayAns.innerHTML = "You got this card WRONG";
			displayAns.style.color = "rgb(196, 17, 17)";	
			displayAns.style.display = "block";
		}
	}
	else if (set[i].unanswered == true) {
		displayAns.style.display = "none";
		
		for (x=0; x<ansButtons.length; x++) {
			ansButtons[x].style.display = "inline-block";
		}
	}
}

/* When the user clicks the finish button, this function will create a pop-up 
alert letting them know how many cards they got right or wrong and how many they
did not answer. Then, the function resets all of the variables that control the
set and brings the user back to the new set screen. */
function finish() {
	var unanswered = set.length - (right + wrong);

	alert("You got " + right + " card(s) right and " + wrong + " card(s) wrong.\nYou did not answer " + unanswered + " card(s).");

	set = [];
	numCards = 0;
	i = 0;
	right = 0;
	wrong = 0;

	document.getElementById("compiled").style.display = "none";
	document.getElementById("new").style.display = "block";
	document.getElementById("numcards").innerHTML = "0";
}












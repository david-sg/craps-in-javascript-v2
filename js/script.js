console.log('start craps game')


window.onload = function() {  
	hideLoadAreas(); 
};


var betDefault = 5;
var playerData = {
	name: null,
	bankroll: 1000,
	wins: 0,
	losses: 0,
	gamesPlayed: 0,
	amountBet:0,
	point: null
};
var diceSum=null;
var diceCounter = 0;

var gameInitialize = function () {
	// clear the input area
	document.getElementById("name-section").style.display = "none";
	document.getElementById("name-input").style.display = "none";
	document.getElementById("name-button").style.display = "none";
	// clear the bets
	document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
	enableButtons()
} 



var startNewRound = function () {
	showPlayerInfo();
	playerData.point = 0;
	// allow betting again
	//reset bet amount
	enableButtons();
	// clear betting area
	playerData.amountBet = 0;
	document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
}



var winner = function (){
	document.getElementById("display-come-out-number").style.visibility = "visible";
	document.getElementById("come-out-number").innerText = playerData.point;
	console.log('winner')
	// this isnt working?
	document.getElementById("win-lose").innerHTML = '<h2>Winner, Winner, Chicken Dinner!\n <br>You Won $' + playerData.amountBet + "</h2>";
	document.getElementById("win-lose").classList.remove('bg-warning');
	document.getElementById("win-lose").classList.add('bg-success');
	document.getElementById("win-lose").removeAttribute('style');
	// end

	playerData.bankroll = (playerData.amountBet * 2) + playerData.bankroll;
	playerData.gamesPlayed++;
	playerData.wins = 	playerData.wins + playerData.amountBet;
	startNewRound()
	return true;
}

var loser = function (){
	console.log('loser')
		//to check if the point is not yet established and we don't want to show in 2nd round 
	document.getElementById("display-come-out-number").style.visibility = "visible"
		if (playerData.point === 0) {
		document.getElementById("come-out-number").innerText = playerData.point;
		}
	document.getElementById("win-lose").innerHTML = '<h2>You Lost $' + playerData.amountBet + "!</h2>";

	document.getElementById("win-lose").removeAttribute('style');
	document.getElementById("win-lose").classList.remove('bg-success');
	document.getElementById("win-lose").classList.add('bg-warning');
	playerData.gamesPlayed++;
	playerData.losses = playerData.losses + playerData.amountBet;
	startNewRound()
	return true;
}

var newPoint = function (){
	disableBets();
	console.log('New Point: ' + playerData.point)
	// show come out number
	document.getElementById("display-come-out-number").style.visibility = "visible";
	document.getElementById("come-out-number").innerText = playerData.point;
	return true;
}



var gamePlay = function () {

// re-enable dice roll
	var rollButton = document.querySelector('#roll-button');
	rollButton.addEventListener('click', rollClicked );	

// Next round of play
document.getElementById("display-come-out-number").style.visibility = "visible";
if (playerData.point >0) {

	if (diceSum === 7) {
		playerData.point = diceSum;
		loser();
		return true;
	} else if (playerData.point === diceSum) {
		playerData.point = diceSum;
		winner();
		return true;
	} else {
		return true;
	}

}
// first round of play
	if (playerData.point < 1) {
		if (diceSum === 7 || diceSum === 11) {
			playerData.point = diceSum;
			winner();
			return true;
		} else if (diceSum === 2 || diceSum === 3 ||diceSum === 12) {
			playerData.point = diceSum;
			loser();
			return true;
		} else {
			playerData.point = diceSum;
			newPoint();
			return true;
		} 
	}
	return true;
}



var diceTimer =	function () {
	tt = setInterval(rollDice, 100); 
}

var rollDice = function () {

	var dice1 = Math.floor( (Math.random() * 6)+1);
	var dice2 = Math.floor( (Math.random() * 6)+1);
	diceSum = dice1 + dice2;
	// console.log('dice 1: ${dice1}' + " dice 2: " +dice2)
	// replace the dice!
	document.getElementById("dice1").src = "img/dice"+dice1+".png";
	document.getElementById("dice2").src = "img/dice"+dice2+".png";
	document.getElementById("dice-total").innerText = diceSum;
	diceCounter++;
	if (diceCounter >10) {
		clearInterval(tt);
		// document.getElementById("dice-total").style.color = "black";
		document.getElementById("dice-total").style.fontWeight = "900";
		if (playerData.point === null) {
			playerData.point = 0;}
			else {
		gamePlay();
			}
		}
}
diceTimer();


var enableButtons = function () {
	// iterate on all bet buttons and enable them...
	const allBetButtons = document.querySelectorAll('.bet');
	for (var i = 0; i <  allBetButtons.length; i++) {
		allBetButtons[i].addEventListener('click', betClicked );
	}

	// change color of roll button and enable roll button
	document.getElementById("roll-button").classList.remove('btn-secondary');
	document.getElementById("roll-button").classList.add('btn-primary');

	var rollButton = document.querySelector('#roll-button');
	rollButton.addEventListener('click', rollClicked );


};



var disableBets = function () {
	console.log ('bets disabled');
	const allBetButtons = document.querySelectorAll('.bet');
	for (var i = 0; i <  allBetButtons.length; i++) {
		// allBetButtons[i].removeEventListener('clicked', betClicked );
		allBetButtons[i].removeEventListener('click', betClicked, false);
	}
 	// document.getElementsByClassName('all-bets')[0].style.pointerEvents = 'none';

}; 


var betClicked = function (event) {
// clear the warning
	document.getElementById("win-lose").style.display = "none";
	var betValue = event.target.value;
// need YOLO and CLEAR conditionals
	if (betValue === 'clear'){
		playerData.bankroll = playerData.bankroll + playerData.amountBet;
		playerData.amountBet = 0;
		document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
		showPlayerInfo();
		return true;
	}

	if (betValue === 'yolo'){
			if (playerData.bankroll === 0){
				document.getElementById("win-lose").style.display = "";
				document.getElementById("win-lose").innerText = "Nothing left to YOLO!";
				return true;
			}
		playerData.amountBet = playerData.bankroll + playerData.amountBet;
		playerData.bankroll = 0;
		document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
		showPlayerInfo();
		return true;
	}

	betValue = Number(betValue);


	//check bank balance
	if (playerData.bankroll + betValue < 0 && betValue > 0) {
	// show them a warning
		document.getElementById("win-lose").style.display = "";
		document.getElementById("win-lose").innerText = "You can not bet more than your bankroll!";
		return true;
	} 
	// don't allow removal of bets to go negative
	if (playerData.bankroll - betValue < 0 && betValue > 0) {
	// show them a warning
		document.getElementById("win-lose").style.display = "";
		document.getElementById("win-lose").innerText = "You can not bet more than your bankroll!";
		return true;
	} 


	if (playerData.bankroll === 0 && betValue >0){
		document.getElementById("win-lose").style.display = "";
		document.getElementById("win-lose").innerText = "You can't bet more than your bankroll!";
		return true;
	} 

	// make all amounts deducted end at 0...

	if (betValue  <0 && (playerData.amountBet + betValue) <=0 ){
		betValue = 0;
		playerData.bankroll = playerData.bankroll +playerData.amountBet;
		playerData.amountBet = 0;
		// document.getElementById("win-lose").style.display = "";
		// document.getElementById("win-lose").innerText = "You can not go below your current bet!";
		// return true;
	} 

	playerData.amountBet = playerData.amountBet + betValue;
		// decrease the players bankroll, or increase it up to the amount they have in the current bet
	playerData.bankroll = playerData.bankroll - betValue;
	document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
	showPlayerInfo();
	return true;
}


var rollClicked = function (event) {
	// disable click of roll to prevent double clicking....
	var rollButton = document.querySelector('#roll-button');
	rollButton.removeEventListener('click', rollClicked, false );
	// go back to default color on dicesum (gray)
	document.getElementById('dice-total').removeAttribute("style");


	console.log ('roll clicked')
	document.getElementById("win-lose").style.display = "none";
	diceCounter = 0;

	// clear your point area (come out)
	// if this is a new roll, clear
	if (playerData.point===0) {
	document.getElementById("display-come-out-number").style.visibility = "hidden";
	}
	diceTimer();
}

var gameStart = function (playerName) {
	showPlayerInfo();
// get a bet
}

var showPlayerInfo = function () {
document.getElementById('player-info').innerHTML = "<h3>Player Info</h3>";

	var ulInput = document.createElement('ul');
	ulInput.setAttribute('class', "ml-1");
	var li = document.createElement("li");
	li.textContent = "Name: " + playerData.name;
	ulInput.appendChild(li);
	li = document.createElement("li");
	li.textContent = "Bankroll: $" + playerData.bankroll;
	ulInput.appendChild(li);
	li = document.createElement("li");
	li.textContent = "Won: $" + playerData.wins;
	ulInput.appendChild(li);
	li = document.createElement("li");
	li.textContent = "Losses: $" + playerData.losses;
	ulInput.appendChild(li);
	li = document.createElement("li");
	li.textContent = "Games Played: " + playerData.gamesPlayed;
	ulInput.appendChild(li);

	var thePlayer = document.getElementById("player-info"); 
	thePlayer.appendChild(ulInput); 
};


//hide areas on load
var hideLoadAreas = function () {
	document.getElementById("display-come-out-number").style.visibility = "hidden";
	document.getElementById("win-lose").style.display = "none";

};



//  get player name input, and validate. If empty ask again...
var nameFunction = function (){
	var input = document.querySelector('#name-input'); 	
	var inputValue = input.value;
	if (inputValue.replace(/\s+/g, '').length == 0) {
		getPlayerName();
		} else {
		playerData.name = inputValue;
		gameInitialize();
		gameStart(inputValue);
		}
}

var getName = function () {
	// build the input and submit button...
    var infoSection = document.getElementById('name-section');
    var nameInput = document.createElement('input');
	nameInput.setAttribute('placeholder', "What's your name?");
	nameInput.setAttribute('type', "text");
	nameInput.setAttribute('class', "form-control name-input");
	nameInput.setAttribute('id', "name-input");
	infoSection.appendChild(nameInput);
	
	var nameButton = document.createElement('button');
	nameButton.setAttribute('class', "btn  btn-primary btn-sm");
	nameButton.setAttribute('type', "submit");
	nameButton.setAttribute('value', "Submit");
	nameButton.setAttribute('id', "name-button");
	nameButton.innerText = 'Submit';
	infoSection.appendChild(nameButton);

	document.querySelector('#name-input').addEventListener('change', nameFunction); 
}

// lets get this started....
getName();



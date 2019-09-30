console.log('start craps game')


window.onload = function() {  
	hideLoadAreas(); 
};


var playerData = {
	name: null,
	bankroll: 1000,
	wins: 0,
	losses: 0,
	gamesPlayed: 0,
	amountBet:0,
	oddsBet: 0,
	point: null,
	gameState: null
};

var oddsPayoff = {
	fourTen: 2,
	fiveNine: 1.5,
	sixEight: 1.2
};

var diceSum=null;
var diceCounter = 0;
var oddsAllowed = 3;

var allNumbers = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var yNumbers = [];

var autoClick =  "";

function round(value) {
    var sign = Math.floor(value*100)/100
    return sign;
    // return value;
}



var gameInitialize = function () {
	// clear the input area
	document.getElementById("name-section").style.display = "none";
	document.getElementById("name-input").style.display = "none";
	document.getElementById("name-button").style.display = "none";
	// clear the bets
	document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
	document.getElementById("odds-bet").innerText = "$"+ playerData.oddsBet;
	enableButtons()
	showInfo (`Welcome ${playerData.name}, <br>Place a bet and Roll!`);
} 

var showInfo = function (value) {
	clearInfo();
	document.getElementById("win-lose").classList.add('btn-info');
	document.getElementById("win-lose").innerHTML = `<h2>${value}</h2>`;
}

var clearInfo = function () {
	document.getElementById("win-lose").style.display = "";
	document.getElementById("win-lose").classList.remove('bg-success');
	document.getElementById("win-lose").classList.remove('btn-info');
	document.getElementById("win-lose").classList.remove('bg-warning');
}


var startNewRound = function () {
	showPlayerInfo();
	disableAutoRoll();
	playerData.point = 0;
	// allow betting again
	//reset bet amount
	disableOdds();
	enableButtons();
	// clear betting area
	playerData.amountBet = 0;
	playerData.oddsBet = 0;
	playerData.gameState = 'come';
	document.getElementById("current-bet").innerText = "$"+ playerData.amountBet;
	document.getElementById("odds-bet").innerText = "$"+ playerData.oddsBet;

}



var winner = function (){
	clearInterval(autoClick);
	document.getElementById("display-come-out-number").style.visibility = "visible";
	document.getElementById("come-out-number").innerText = playerData.point;
	console.log('winner')
	// calculate total winnings
	// double to account for amount bet
	// calculate the odds bets...
		var oddsWin =0;
	if (playerData.point ===4 || playerData.point ===10) {
		oddsWin = playerData.oddsBet * oddsPayoff.fourTen;
	} else 	if (playerData.point ===5 || playerData.point ===9) {
		oddsWin = playerData.oddsBet * oddsPayoff.fiveNine;
	} else  if (playerData.point ===6 || playerData.point ===8) {
		oddsWin = playerData.oddsBet * oddsPayoff.sixEight;
	} 



	var totalWin = (playerData.amountBet * 2) +  playerData.oddsBet + oddsWin;
	// single for simple calculateion
	var simpleWin = playerData.amountBet + oddsWin;
	clearInfo();
	document.getElementById("win-lose").innerHTML = '<h2>Winner, Winner, Chicken Dinner!\n <br>You Won $' + totalWin + "</h2>";
	document.getElementById("win-lose").classList.add('bg-success');

	playerData.bankroll = playerData.bankroll + totalWin;
	playerData.gamesPlayed++;
	playerData.wins = 	playerData.wins + simpleWin;
	startNewRound()
	return true;
}

var loser = function (){
	clearInterval(autoClick);
	console.log('loser')
		//to check if the point is not yet established and we don't want to show in 2nd round 
	document.getElementById("display-come-out-number").style.visibility = "visible"
		if (playerData.point === 0) {
		document.getElementById("come-out-number").innerText = playerData.point;
		}
	var totalLost = playerData.amountBet + playerData.oddsBet;
	document.getElementById("win-lose").innerHTML = '<h2>You Lost $' + totalLost + "!</h2>";
	clearInfo();
	document.getElementById("win-lose").classList.add('bg-warning');
	playerData.gamesPlayed++;
	playerData.losses = playerData.losses + totalLost;
	startNewRound()
	return true;
}

var newPoint = function (){
	disableBets();
	// v2 change from disable to enable for odds if a player has made a bet on 'come out'
	if (playerData.amountBet >0) {
		enableButtonsOdds();
		}
	playerData.gameState = 'point';
	// enable to autoroll button
	enableAutoRoll();
	console.log('New Point: ' + playerData.point)
	// show come out number
	document.getElementById("display-come-out-number").style.visibility = "visible";
	document.getElementById("come-out-number").innerText = playerData.point;
	return true;
}

var enableAutoRoll = function () {
	document.getElementById("auto-roll-button").classList.remove('btn-secondary');
	document.getElementById("auto-roll-button").classList.add('btn-primary');
	var autoRollButton = document.querySelector('#auto-roll-button');
	autoRollButton.addEventListener('click', autoRollClicked );	
}

var disableAutoRoll = function () {
	var autoRollButton = document.querySelector('#auto-roll-button');
	autoRollButton.removeEventListener('click', autoRollClicked , false );
	document.getElementById("auto-roll-button").classList.remove('btn-primary');
	document.getElementById("auto-roll-button").classList.add('btn-secondary');
	}

var autoRollClicked = function () {
	// prevent a loop!
	clearInterval(autoClick);

	console.log('autoroll clicked');
	autoClick = setInterval(rollDice, 1500); 

};


var gamePlay = function () {

// add data for graphing
allNumbers[diceSum] = allNumbers[diceSum] +1;
yNumbers = allNumbers.slice(2);
// yNumbers = [4,3,5,8,7,7,4,3,7.8,3]

addData (myChart, yNumbers)

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
	if (playerData.gameState ==="come") {
		document.getElementById("display-come-out-number").style.visibility = "hidden";
		}

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


var enableButtonsOdds = function () {
	// iterate on all bet buttons and enable them...
	const allBetButtons = document.querySelectorAll('.bet');
	for (var i = 0; i <  allBetButtons.length; i++) {
		allBetButtons[i].addEventListener('click', oddsBetClicked );
	}

	// change color of roll button and enable roll button
	document.getElementById("roll-button").classList.remove('btn-secondary');
	document.getElementById("roll-button").classList.add('btn-primary');
};



var disableBets = function () {
	console.log ('bets disabled');
	const allBetButtons = document.querySelectorAll('.bet');
	for (var i = 0; i <  allBetButtons.length; i++) {
		// allBetButtons[i].removeEventListener('clicked', betClicked );
		allBetButtons[i].removeEventListener('click', betClicked, false);
	}
}; 


var disableOdds = function () {
	console.log ('odds disabled');
	const allBetButtons = document.querySelectorAll('.bet');
	for (var i = 0; i <  allBetButtons.length; i++) {
		// allBetButtons[i].removeEventListener('clicked', betClicked );
		allBetButtons[i].removeEventListener('click', oddsBetClicked, false);
	}
};

var oddsBetClicked = function (event) {
	document.getElementById("win-lose").style.display = "none";
	var betValue = event.target.value;
	var maxBet = playerData.amountBet * oddsAllowed;
	console.log ('odds bet clicked: ' + betValue);
	console.log ('max bet: ' + maxBet);
// check for the yolo bet first
	if (betValue === 'yolo'){
		console.log('odds yolo clicked');
			if (playerData.bankroll === 0){
					showInfo (`Nothing left to YOLO!`);
				return true;
			}
			if (playerData.oddsBet === maxBet){
					showInfo (`Max Odds Bet Made`);
				return true;
			}
		// make the bet at most the limit off the odds allowed;		
		if (maxBet > playerData.bankroll) {
			playerData.oddsBet = playerData.bankroll;
			playerData.bankroll = 0;
		} else {
			// adjust to account for existing bet before updating the bankroll
			var adjustedMaxBet = maxBet - playerData.oddsBet;
			playerData.oddsBet = maxBet;			
			playerData.bankroll = playerData.bankroll - adjustedMaxBet;
		}
		console.log('odds bet: ' + playerData.oddsBet);
		document.getElementById("odds-bet").innerText = "$"+ playerData.oddsBet;
		showPlayerInfo();
		return true;
	}

	// check if the bets should be cleared
	if (betValue === 'clear'){
		playerData.bankroll = playerData.bankroll + playerData.oddsBet;
		playerData.oddsBet = 0;
		document.getElementById("odds-bet").innerText = "$"+ playerData.oddsBet;
		showPlayerInfo();
		return true;
	}

	// calculations for rest of buttons 
	betValue = Number(betValue);

	// check if bet value plus existing bet is more than max odds allowed, and also not over the bankroll

	// simple bankroll check
	//check bank balance
	if (playerData.bankroll - playerData.oddsBet - betValue < 0 && betValue > 0) {
	// show them a warning
		showInfo (`You can not bet more than your bankroll!`);
		return true;
	} 
	// check to make sure the bet isnt more than the max allowed by the odds
	if ((betValue + playerData.oddsBet) > maxBet) {
	// show them a warning
		showInfo (`You can't bet more than the max odds allowed`);
		return true;
	} 

// prevent negative odds bets, only allow to go to 0
	if ((playerData.oddsBet + betValue) < 0 ) {
		console.log	('negative bet check, current odds bet: ' + playerData.oddsBet )
		console.log	('bet value to reduce: ' + betValue )
		playerData.bankroll = playerData.bankroll + playerData.oddsBet;
		playerData.oddsBet = 0;
		document.getElementById("odds-bet").innerText = "$"+ playerData.oddsBet;
		showPlayerInfo();
		return true;
	} 

// output of allowed bet

	playerData.oddsBet = playerData.oddsBet + betValue;
		// decrease the players bankroll, or increase it up to the amount they have in the current bet
	playerData.bankroll = playerData.bankroll - betValue;
	document.getElementById("odds-bet").innerText = "$"+ playerData.oddsBet;

	showPlayerInfo();
	return true;

}

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
				showInfo (`Nothing left to YOLO!`);
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
		showInfo (`You can not bet more than your bankroll!`);
		return true;
	} 
	// don't allow removal of bets to go negative
	if (playerData.bankroll - betValue < 0 && betValue > 0) {
	// show them a warning
		showInfo (`You can not bet more than your bankroll!`);
		return true;
	} 


	if (playerData.bankroll === 0 && betValue >0){
		showInfo (`You can't bet more than your bankroll!`);
		return true;
	} 

	// make all amounts deducted end at 0...

	if (betValue  <0 && (playerData.amountBet + betValue) <=0 ){
		betValue = 0;
		playerData.bankroll = playerData.bankroll +playerData.amountBet;
		playerData.amountBet = 0;
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

var showPlayerInfo = function () {
document.getElementById('player-info').innerHTML = "<h3>Player Info</h3>";

	var ulInput = document.createElement('ul');
	ulInput.setAttribute('class', "ml-1");
	var li = document.createElement("li");
	li.textContent = "Name: " + playerData.name;
	ulInput.appendChild(li);
	li = document.createElement("li");

	playerData.bankroll=round (playerData.bankroll)
	li.textContent = "Bankroll: $" + playerData.bankroll;
	ulInput.appendChild(li);
	li = document.createElement("li");

	playerData.wins=round (playerData.wins)
	li.textContent = "Won: $" + playerData.wins;
	ulInput.appendChild(li);
	li = document.createElement("li");

	playerData.losses=round (playerData.losses)
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
		showPlayerInfo(inputValue);
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
// spin them dice
diceTimer();
// ask for user's name
getName();



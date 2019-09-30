permalink: /index.html
# craps-in-javascript

Description: Basic craps dice game, allowing the player to place a bet, roll the dice, win, lose etc. 
Player can place an initial bet, with conditions to check things like bankroll.
If they do not win/lose on that initial roll, they must roll again and hit the same number.
They can place an additional bet on these follow up rolls, up to the house limit (currently set to 3x the
initial bet).
This is also subject to various conditions.

My approach to building the game
1) create the basic design using bootstrap, I wanted a decent design from the start
2) go piece by piece through the board, implementing each element
	for example, I first worked out the betting buttons, enabling them
	then working out how they interact with the bankroll. Getting the YOLO and clear functions to work etc.
3) I used an object to hold the playerData, which kept track of the bankroll, amount bet, (odds bet- added later in v2), dice roll number, and game state.
v1 of the game had a basic single betting mechanism, only allowing a bet on the initial roll.
V2 expanded the betting functionality to allow for Odds Bets on additional rolls.
4) After testing with a user, I added an autoroll feature as pressing a 'roll' button was tedious for subsequent roles.
5) The autoroll helped to play faster and expose a few bugs.
6) I was able to add an additional chart.js library to graph the dice output, this adds a nice visual element


Why I chose this game:
It allowed me to do a lot of DOM manipulation, and design with Bootstrap which is something I needed practice on. It also allowed me to use setInterval for the dice function, and the autoroll.

It did not require content, but instead relied on random output and betting gameplay. This allowed more focus
on getting the DOM and conditionals working properly.


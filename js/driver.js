const driver = new Driver();
const oddsDriver = new Driver();
// Define the steps for introduction
driver.defineSteps([
  {
    element: '#name-input',
    popover: {
      className: 'first-step-popover-class',
      title: 'Start Game',
      description: 'Enter your name to start the game',
      position: 'left'
    }
  },
  {
    element: '#bet-size',
    popover: {
      title: 'Place a Bet',
      description: 'First, place a bet on the intitial roll. You can add or subtract your bet using these buttons.',
      position: 'right'
    }
  },
  {
    element: '#current-bet',
    popover: {
      title: 'Initial Bet',
      description: 'Your initial bet will be shown here',
      position: 'bottom'
    }
  },
  {
    element: '#roll-button',
    popover: {
      title: 'First Roll',
      description: 'Click Roll Button to roll the dice. Once you click roll, you can not alter your initial bet.',
      position: 'left'
    }
  },


]);

oddsDriver.defineSteps([
    {
      element: '#come-out-number',
     popover: {
        title: 'Come Out Number - Point',
        description: 'Since you did not hit a 2,3,7,11, or 12 on the initial roll, you now have a point. To win, you have to roll this number before rolling a 7.',
        position: 'Below',
      }
      },
      {
      element: '#bet-size',
        popover: {
        title: 'Odds Bet',
        description: 'With a Point, you can place an additional odds bet on this number. This odds bet can be up to 3x your initial bet. Press YOLO to place the maximum odds bet.',
        position: 'right',
        }
      },
      {
      element: '#roll-area',
        popover: {
        title: 'Roll Dice',
        description: 'You can do a single roll, or have the computer keep rolling till you win or lose...',
        doneBtnText: 'Done',
        position: 'left',
        }
      },
  ]);
// Start the introduction
driver.start();


// filename: index.js
// Imports
import { Strategy } from './models';
import { GameController } from './controllers';



// Prepare the game
const gameController = new GameController(Strategy.dynamicDealerStrategy);


// Router
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#start').addEventListener('click', function() {
        const nPlayers = prompt('How many players?');
        gameController.prepareGame(Math.max((nPlayers)?? 1,1));
        gameController.startGame();
    });
    document.querySelector('#hit').addEventListener('click', function() {
        gameController.getCard();
    });
    document.querySelector('#stand').addEventListener('click', function() {
        gameController.stand();
    });
    document.querySelector('#restart').addEventListener('click', function() {
        const nPlayers = gameController.game.nPlayers;
        gameController.prepareGame(Math.max((nPlayers)?? 1,1));
        gameController.startGame();
    });


});

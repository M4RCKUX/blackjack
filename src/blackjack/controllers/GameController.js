// filename: GameController.js
import {Card, Game, Strategy} from "../models";
import {Renderer} from "../views";


export class GameController {
    // fields
    /**
     * @type {Strategy}
     */
    strategy;
    /**
     * @type {Renderer}
     */
    renderer;
    /**
     * @type {Game}
     */
    game;

    /**
     * @param {Strategy} strategy
     */
    constructor(strategy)
    {
        this.renderer = Renderer.getInstance();
        this.game = Game.getInstance();
        this.strategy = strategy;
    }

    /**
     * @param {number} nPlayers
     * @returns {void}
     */
    prepareGame(nPlayers=1)
    {
        this.game.prepare(nPlayers);
        this.renderer.prepareGame(this.game);
    }

    /**
     * @returns {void}
     */
    startGame()
    {
        this.game.start();
        this.renderer.startGame(this.game);
    }

    /**
     * @returns {Card}
     */
    getCard()
    {
        const card = this.game.getCard();
        const activePlayer = this.game.activePlayer;
        const score = this.game.players[activePlayer].hand.getScore();
        this.renderer.renderCard(card, activePlayer);
        this.renderer.renderScore(score, activePlayer);
        if (score >= 21) {
            this.stand();
        }
        return card;
    }

    /**
     * @returns {void}
     */
    stand()
    {
        this.game.players[this.game.activePlayer].isPlaying = false;
        this.game.activePlayer++;
        this.renderer.renderFrame(this.game.activePlayer);
        if (this.game.activePlayer === this.game.nPlayers) {
            this.computerTurn();
        }
    }

    /**
     * @returns {void}
     */
    computerTurn()
    {
        const computer = this.game.nPlayers;
        let card = null;
        do {
            card = this.game.computerTurn(this.strategy);
            if (card) {
                this.renderer.renderCard(card, computer);
                this.renderer.renderScore(this.game.players[computer].hand.getScore(), computer);
            }
        } while (card);
        this.renderer.renderResult(this.game.getResult());
    }

}
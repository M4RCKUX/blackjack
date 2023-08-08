import {Player} from "./";
import {Deck} from "./";
import {Strategy} from "./";
import {Card} from "./";

export class Game
{
    static instance = null;

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    // fields
    /**
     * @type {number}
     */
    nPlayers = 1;
    /**
     * @type {array<Player>}
     */
    players = [];
    /**
     * @type {Deck | null}
     */
    deck = null;
    /**
     * @type {number | null}
     */
    activePlayer = null;


    /**
     * @param {number} nPlayers
     */
    prepare(nPlayers)
    {
        this.nPlayers = nPlayers;
        this.players = [];
        for (let i = 0; i <= nPlayers; i++) {
            const player = new Player();
            player.isPlaying = true;
            this.players.push(new Player());
        }
        this.deck = new Deck();
        this.deck.shuffle();

    }
    start()
    {
        this.players.forEach(p=>{
            p.hand.reset();
            p.hand.addCard(this.deck.getCard());
            p.hand.addCard(this.deck.getCard());
        });
        this.activePlayer = 0;
    }

    /**
     * @returns {Card}
     */
    getCard()
    {
        const player = this.players[this.activePlayer];
        const card = this.deck.getCard();
        player.hand.addCard(card);
        return card;
    }

    /**
     * @returns {null}
     */
    stand()
    {
        this.players[this.activePlayer].isPlaying = false;
        this.activePlayer++;
        return null;
    }

    /**
     * @param strategy {function}
     * @returns {Card | null}
     */
    computerTurn(strategy)
    {
        const action = strategy(this);
        switch (action) {
            case Strategy.STAND:
                return this.stand();
            default:
                return this.getCard();
        }
    }

    /**
     * @returns {array<number>} the result of the game
     */
   getResult()
   {
        const computerScore = this.players[this.nPlayers].hand.getScore();
        const result = [];
        for (let i = 0; i < this.nPlayers; i++) {
            if (this.players[i].getScore() > 21) {
                result.push(-1);
            } else if (computerScore > 21) {
                result.push(1);
            } else if (this.players[i].getScore() < computerScore) {
                result.push(-1);
            } else if (this.players[i].getScore() === computerScore) {
                result.push(0);
            } else {
                result.push(1);
            }
        }
        return result;
    }

}

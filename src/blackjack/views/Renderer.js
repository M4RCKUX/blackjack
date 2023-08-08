// filename: Renderer.js
import {Game, Card} from "../models"

export class Renderer {
    static WAITING = 0;
    static PLAYING = 1;
    // static fields
    static instance = null;
    static matId = '#mat';
    static hitButtonId = '#hit';
    static standButtonId = '#stand';
    static startButtonId = '#start';
    static restartButtonId = '#restart';

    // class fields
    /**
     * @type {array<HTMLDivElement>}
     */
    playerDivs = [];
    /**
     * @type {HTMLDivElement}
     */
    mat = null;
    /**
     * @type {HTMLButtonElement}
     */
    hitButton = null;
    /**
     * @type {HTMLButtonElement}
     */
    standButton = null;
    /**
     * @type {HTMLButtonElement}
     */
    startButton = null;
    /**
     * @type {HTMLButtonElement}
     */
    restartButton = null;


    constructor() {
        this.mat = document.querySelector(Renderer.matId);
        this.hitButton = document.querySelector(Renderer.hitButtonId);
        this.standButton = document.querySelector(Renderer.standButtonId);
        this.startButton = document.querySelector(Renderer.startButtonId);
        this.restartButton = document.querySelector(Renderer.restartButtonId);
    }

    /**
     * @returns {Renderer}
     */
    static getInstance() {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer();
        }
        return Renderer.instance;
    }

    /**
     * @param {Game} game
     * @returns {void}
     */
    prepareGame(game) {
        this.clearContainer(this.mat);
        this.playerDivs = [];
        const nPlayers = game.nPlayers;
        for (let i = 0; i <= nPlayers; i++) {

            // the div where the player's name, cards and score are rendered
            const div = document.createElement('DIV');
            div.classList.add('player');

            // the player's name
            const playerName = document.createElement('H2');
            playerName.classList.add('player_name');
            if (i === nPlayers) {
                playerName.innerText = 'Computer';
            } else {
                playerName.innerText = 'Player ' + (i+1);
            }

            // the hand div
            const handDiv = document.createElement('DIV');
            handDiv.classList.add('hand_div');

            // the hand
            const hand = document.createElement('DIV');
            hand.classList.add('hand');

            // the score and message div
            const messageDiv = document.createElement('DIV');
            messageDiv.classList.add('message');

            div.appendChild(playerName);
            div.appendChild(handDiv);
            handDiv.appendChild(hand);
            handDiv.appendChild(messageDiv);

            this.playerDivs.push(div);
            this.mat.appendChild(div);
        }
        this.setButtons(Renderer.PLAYING);
    }

    /**
     * @param {number} gameState
     */
    setButtons(gameState) {
        if (gameState === Renderer.WAITING) {
            this.hitButton.disabled = true;
            this.standButton.disabled = true;
            this.startButton.disabled = false;
            this.restartButton.disabled = false;
            this.restartButton.classList.remove('hidden');
        } else if (gameState === Renderer.PLAYING) {
            this.hitButton.disabled = false;
            this.standButton.disabled = false;
            this.startButton.disabled = true;
            this.restartButton.disabled = true;
            this.restartButton.classList.add('hidden');

        }
    }

    /**
     * @param {Game} game
     */
    startGame(game) {
        const players = game.players;
        for (let i = 0; i < players.length; i++) {
            players[i].hand.cards.forEach(card => {
                this.renderCard(card, i);
                this.renderScore(players[i].hand.getScore(), i);
            });
        }
        this.renderFrame(game.activePlayer);
        this.setButtons(Renderer.PLAYING);
    }

    /**
     * @param {Card} card
     * @param {number} player
     */
    renderCard(card, player) {
        const img = document.createElement('IMG');
        img.src = card.image;
        img.classList.add('card');
        const handDiv = this.playerDivs[player].querySelector('.hand');
        handDiv.appendChild(img);
    }

    /**
     * @param {number} player
     */
    renderFrame(player) {
        for (let i = 0; i < this.playerDivs.length; i++) {
            if (i===player) {
                this.playerDivs[i].classList.add('active');
            } else {
                this.playerDivs[i].classList.remove('active');
            }
        }
    }

    /**
     * @param {number} score
     * @param {number} player
     */
    renderScore(score, player) {
        const message = score === 21 ? 'Blackjack!' : score > 21 ? 'Bust!' : score;
        this.renderMessage(message, player);
    }

    /**
     * @param {string | number} message
     * @param {number} player
     */
    renderMessage(message, player) {
        const messageDiv = this.playerDivs[player].querySelector('.message');
        messageDiv.innerText = message;
    }

    /**
     * @param {array<number>} result
     */
    renderResult(result) {
        for (let i = 0; i < result.length; i++) {
            const message = result[i] === 0 ? 'Draw!' : result[i] === 1 ? 'Win!' : 'Lose!';
            this.renderMessage(message, i);
        }
        this.setButtons(Renderer.WAITING);
    }

    /**
     * @param {HTMLDivElement} container
     */
    clearContainer(container) {
        container.innerHTML = '';
    }
}
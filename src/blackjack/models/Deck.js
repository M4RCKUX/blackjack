import {Card} from "./";

export class Deck {

    static clubs = ['H', 'C', 'S', 'D'];
    static values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    constructor() {
        this.cards = [];
        Deck.clubs.forEach(c =>
            Deck.values.forEach(v => {
                const image = v + c;
                const value = (
                    v === 'A' ? 11 : isNaN(parseInt(v)) ? 10 : parseInt(v)
                );
                this.cards.push(new Card(image, value));
            })
        );
    }

    /**
     * Shuffles array in place. ES6 version
     * @returns {void}
     */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    /**
     *
     * @returns {Card}
     */
    getCard()
    {
        return this.cards.pop();
    }
}

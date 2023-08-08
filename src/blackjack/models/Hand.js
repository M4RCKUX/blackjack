import { Card } from "./";
export class Hand
{
    constructor()
    {
        this.cards = [];
    }

    /**
     *
     * @param {Card} card
     * @returns {void}
     */
    addCard(card)
    {
        this.cards.push(card);
    }

    /**
     * resets the hand
     * @returns {void}
     */
    reset()
    {
        this.cards=[];
    }

    /**
     * @returns {number} the score of the hand
     */
    getScore()
    {
        return this.cards.reduce(
            (acc, card) => acc + card.value,
            0
        );
    }
}
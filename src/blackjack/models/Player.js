import {Hand} from "./";

export class Player
{

    constructor()
    {
        this.hand = new Hand();
        this.isPlaying = true;
    }

    /**
     * @returns {number}
     */
    getScore()
    {
        return this.hand.getScore();
    }
}

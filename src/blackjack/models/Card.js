export class Card
{
    static IMG_PATH = 'assets/img/';
    static BACK = Card.IMG_PATH + 'red_back.png';

    /**
     *
     * @param {string} image the path to the image
     * @param {number} value the value of the card
     */
    constructor(image, value)
    {
        this.image = Card.IMG_PATH + image + '.png';
        this.value = value;
    }
}
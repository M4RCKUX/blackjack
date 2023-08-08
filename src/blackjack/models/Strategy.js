import {Game} from "./";
export class Strategy {

    static STAND = 0;
    static HIT = 1;

    /**
     * @param {Game} game
     * @returns {number}
     */
    static beatAll(game)
    {
        const computer = game.nPlayers;
        const humanPlayers = game.players.slice(0, -1);
        const maxScore = humanPlayers
            .map(p=>p.hand.getScore())
            .filter(s => s<= 21)
            .reduce((acc, s)=>Math.max(acc,s), 0);
        const computerScore = game.players[computer].hand.getScore();
        if (computerScore > 19) {
            return Strategy.STAND;
        } else if (computerScore > maxScore) {
            return Strategy.STAND;
        } else {
            return Strategy.HIT;
        }
    }

    /**
     * @param {Game} game
     * @returns {number}
     */
    static conservative(game)
    {
        let result = Strategy.beatAll(game);
        if (result === Strategy.HIT) {
            const computer = game.nPlayers;
            const computerScore = game.players[computer].hand.getScore();
            if (computerScore > 15) {
                return Strategy.STAND;
            }
        }
        return result;
    }

    /**
     * @param {Game} game
     * @returns {number}
     */
    static dynamicDealerStrategy(game) {
        const computer = game.nPlayers;
        const computerScore = game.players[computer].hand.getScore();
        const humanScores = game.players.slice(0, -1).map(p => p.hand.getScore());

        // Calculate how many players the dealer currently beats
        const playersBeaten = humanScores.filter(score => score > 21 || score <= computerScore).length;

        // Predict score if dealer takes another card
        // We'll simplify and predict the average card value, 7 (since the middle card value of a deck is 7)
        const predictedScore = computerScore + 7;

        // Calculate how many players the dealer would likely beat with the predicted score
        let predictedPlayersBeaten;
        if (predictedScore > 21) {
            predictedPlayersBeaten = humanScores.filter(score => score > 21).length;
        } else {
            predictedPlayersBeaten = humanScores.filter(score => score <= predictedScore).length;
        }

        // Decision
        if (predictedPlayersBeaten > playersBeaten || (computerScore <= 11)) {
            // We added the second condition as it's always safe to hit when the dealer has 11 or less.
            return Strategy.HIT;
        } else {
            return Strategy.STAND;
        }
    }

}
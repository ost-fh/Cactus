export type score = {
    positive: number;
    negative: number;
    neutral: number;
    amountOfTests: number;
};

export const combineScore = (scores: score[]) => {
    const resultingScore: score = {
        positive: 0,
        negative: 0,
        amountOfTests: 0,
        neutral: 0,
    };
    scores.forEach((item) => {
        resultingScore.positive += item.positive;
        resultingScore.negative += item.negative;
        resultingScore.neutral += item.neutral;
        resultingScore.amountOfTests += item.amountOfTests;
    });

    // If criteria-results are counted together, the amount of tests is set to 1
    if (resultingScore.amountOfTests === 0) {
        resultingScore.amountOfTests = 1;
    }
    return resultingScore;
};

export const choiceToScore = (choice: string): score => {
    if (!(choice === "yes" || choice === "no" || choice === "not_decidable")) {
        console.error("invalid choice value");
    }
    return {
        positive: choice === "yes" ? 1 : 0,
        negative: choice === "no" ? 1 : 0,
        neutral: choice === "not_decidable" ? 1 : 0,
        amountOfTests: 0,
    };
};

export const calcScorePercentage = (score: score) => {
    const total = score.positive + score.negative;
    return Math.floor((score.positive * 100) / total);
};

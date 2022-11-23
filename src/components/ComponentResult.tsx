import React, { useEffect, useState } from "react";
import {
  calcScorePercentage,
  choiceToScore,
  combineScore,
  score,
} from "../scoring";
import { component } from "../types";
import CountBubble from "./CountBubble";
import ScoreBubble from "./ScoreBubble";

type ComponentResultProps = {
  component: component;
  addScore: Function;
};

const ComponentResult = ({ component, addScore }: ComponentResultProps) => {
  const [scores, setScores] = useState<
    {
      mode: string;
      results: score;
    }[]
  >();
  const [componentScore, setComponentScore] = useState<score>();

  useEffect(() => {
    // console.log(component);
    const resultingScore = component.modes.map((mode) => {
      // hier muss noch mehrfachtesting richtig berücksichtigt werden.
      const modeResults = mode.tests.map((test) => {
        const testsResults = test.criteria.map((criterium) => {
          // console.log(criterium.choice);
          return choiceToScore(criterium.choice);
        });
        return combineScore(testsResults);
      });
      return { mode: mode.name, results: combineScore(modeResults) };
    });

    // console.log(resultingScore);
    setScores(resultingScore);
    const componentScore = combineScore(
      resultingScore.map((item) => item.results)
    );
    setComponentScore(componentScore);
    // addScore(calcScorePercentage(componentScore));

    return () => {};
  }, [component]);

  return (
    <article className='lib-testresult'>
      <header>
        <h2>{component.name}</h2>
        {componentScore && (
          <ScoreBubble score={calcScorePercentage(componentScore)} />
        )}
      </header>
      <main>
        {scores?.map((item) => (
          <div>
            <h4>{item.mode} Scores:</h4>

            <div className='count-list'>
              <CountBubble label='positive' count={item.results.positive} />
              <CountBubble label='negative' count={item.results.negative} />
              <CountBubble label='neutral' count={item.results.neutral} />
              <CountBubble
                label='amount of tests'
                count={item.results.amountOfTests}
              />
            </div>
          </div>
        ))}
      </main>
    </article>
  );
};

export default ComponentResult;

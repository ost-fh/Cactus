import React, { useContext, useEffect, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { UserContext } from "../../../App";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import LinkButton from "../../../shared/components/link-button";
import ScoreBubble from "../../../shared/components/score-bubble";
import { Mode } from "../../../shared/resources/types";
import { SHOW_AGREEMENT_SCORE } from "../library-detail";

import CriteriumResult from "./criterium-result";
import { getAllTestModes } from "../../../shared/services/api";

type ComponentResultDetailsProps = {
  componentName: string;
  testModes: Mode[];
  testlabComponentURL: string;
};

type Score = {
  modeName: string;
  mode: Mode | undefined;
};

/** This Component is used with ComponentResult */
const ComponentResultDetails = ({
  componentName,
  testModes,
  testlabComponentURL,
}: ComponentResultDetailsProps) => {
  const userData = useContext(UserContext);

  const [allTestModes, setAllTestModes] = useState<Score[]>();

  // map the existing testMode-resultdata on all possible testModes of the component type
  useEffect(() => {
    getAllTestModes(componentName).then((testModeStrings) => {
      const allTestModes = testModeStrings.map((testMode): Score => {
        return {
          modeName: testMode,
          mode: testModes.find((item) => item.name === testMode),
        };
      });
      setAllTestModes(allTestModes);
    });
  }, [componentName, testModes]);

  return (
    <>
      <div className='scores detail-scores'>
        {allTestModes &&
          allTestModes.map((testMode) =>
            testMode.mode ? (
              <>
                <h3>{testMode.modeName}:</h3>
                <ScoreBubble
                  color='green-light'
                  score={testMode.mode.accessibilityScore}
                />
                <CountBubble
                  label='Tests'
                  count={testMode.mode.testScores?.amountOfTests}
                />
                {SHOW_AGREEMENT_SCORE && (
                  <CountBubble
                    label='Agreement Score'
                    count={testMode.mode.agreementScore}
                  />
                )}
                {testMode.mode.scoresPerCriterium.map((item) => {
                  return (
                    <CriteriumResult
                      key={item.criterium_id + testMode.modeName}
                      item={item}
                    />
                  );
                })}
              </>
            ) : (
              <Alert type='help' className='alert-with-icon'>
                <BsInfoCircleFill />
                <p>
                  There were no {testMode.modeName} accessibility tests done
                  yet.
                </p>
                {userData && (
                  <LinkButton
                    to={`${testlabComponentURL}&mode=${testMode.modeName}`}
                    label={"Add tests"}
                    ariaLabel={`Add ${testMode.modeName} accessibility tests for the ${componentName} component.`}
                  />
                )}
              </Alert>
            )
          )}
      </div>
    </>
  );
};

export default ComponentResultDetails;

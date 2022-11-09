import React from "react";
import LinkButton from "../components/LinkButton";
import TestItem from "../components/TestItem";

type testDataType = {
  libraryId: string;
  component: string;
  testtype: string;
  criteriaGroup: object;
};

const criteria = [
  {
    _id: "123",
    text: "focus style is visible",
    help: "Hier steht hilfetext",
  },
  {
    _id: "1243",
    text: "buttons are focusable",
    help: "Hier steht hilfetext",
  },
];

// brauchts das? gibt es zusätzliche angaben? ja -> videolinsk, allg. instructions
const criteriaGroup = {
  videoLink: "test.com",
  instructions: "This is how you test a Dialog.",
  additionalHint: "mode: keyboard use Hinweis",
  criteria: criteria,
};

const testData = {
  libraryId: "234214",
  library: {}, // fetch from server
  component: "Dialog",
  testtype: "Keyboard",
  criteriaGroup: criteriaGroup,
};

// Library Data import -> title, links ...

const Test = () => {
  const toggleHelp = {};

  return (
    <div className='component-test'>
      <div className='test-general'>
        <p>Library: {testData.libraryId} </p>
        <p>Component: {testData.component} </p>
        <p>Testmode: {testData.testtype} </p>
        <LinkButton path={"test"} label='Open documentation in new window' />
      </div>
      <div className='alert-info'>{testData.criteriaGroup.additionalHint}</div>
      <div className='test-instructions'>
        <h3>Instructions</h3>
        {testData.criteriaGroup.instructions}
        <div>video: {testData.criteriaGroup.videoLink} </div>
      </div>
      <section className='test-list'>
        {testData.criteriaGroup.criteria.map((criteria) => (
          <TestItem key={criteria._id} criteria={criteria} />
        ))}
      </section>
      <button type='submit'>Finish Test</button>
    </div>
  );
};

export default Test;

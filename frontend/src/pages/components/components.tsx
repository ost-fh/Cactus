import React from "react";
import Alert from "../../shared/components/alert";
import Bubble from "../../shared/components/bubble";
import CountBubble from "../../shared/components/count-bubble";
import ScoreBubble from "../../shared/components/score-bubble";
import LibraryCard from "../libraries/parts/library-card";

const Components = () => {
  return (
    <div className='container'>
      <main
        id='main'
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <h1>Components</h1>
        <h2>Alerts</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Alert type='info' message='asdf' />
          <Alert type='error' message='asdf' />
          <Alert type='success' message='asdf' />
          <Alert type='help' message='asdf' />
        </div>
        <h2>Buttons</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button>Button</button>
          <button className='button-selected'>Button</button>
          <button className='button-primary'>Button</button>
          <button className='button-primary' disabled>
            Button
          </button>
        </div>
        <h2>Bubbles</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Bubble value={5} label='asdf' />
          <Bubble label='asd' />
          <Bubble value={"100%"} color='green' label='green' />
          <Bubble value={"100%"} label='blue' color='blue' />
          <Bubble value={"80-100%"} label='blue' color='blue' />
          <Bubble value='?' label='yellow' color='yellow' />
          <Bubble value='X' label='red' color='red' />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ScoreBubble score={undefined} />
          <ScoreBubble score={1} />
          <CountBubble count={4} />
          {/* Remove Count Bubble */}
        </div>
        <h2>Library Cards</h2>
        <LibraryCard library={libraryExample} />
        <LibraryCard
          library={libraryExample}
          filterState='true'
          filters={["Tooltip", "Accordion"]}
        />
        <LibraryCard
          library={libraryExample}
          filterState='neutral'
          filters={["Tooltip", "Accordion"]}
          focusScore={"31"}
        />
        <LibraryCard library={libraryExample} filterState='false' />
      </main>
    </div>
  );
};

export default Components;

const libraryExample = {
  _id: "123673456",
  title: "Example UI",
  currentVersion: "v0.1",
  versions: [
    {
      version: "v0.1",
      amountOfComponentsTested: 1,
      accessibilityScore: 34,
      components: [
        {
          name: "Tooltip",
          alternativeComponentNames: "",
          accessibilityScore: 44,
          agreementScore: 33,
          modes: [],
          componentTested: true,
          amountOfTests: 3,
        },
      ],
    },
  ],
  linkHome: "",
  linkDocs: "",
};

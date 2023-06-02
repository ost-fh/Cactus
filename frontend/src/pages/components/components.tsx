import React from "react";
import { BsXLg } from "react-icons/bs";
import Alert from "../../shared/components/alert";
import Bubble from "../../shared/components/bubble";
import CountBubble from "../../shared/components/count-bubble";
import ResultBubble from "../../shared/components/result-bubble";
import ScoreBubble from "../../shared/components/score-bubble";
import Toggletip from "../../shared/components/toggletip";
import Tooltip from "../../shared/components/tooltip";
import LibraryCard from "../libraries/parts/library-card";
import "./components.scss";
import LoadingSpinner from "../../shared/components/loading";

// This page is only for development purposes and is not available in productive environments.
const Components = () => {
  return (
    <div className='container components'>
      <main
        id='main'
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <h1>Cactus UI Components</h1>
        <h2>Colors</h2>
        <div className='colors'>
          <div className='color green-xlight'></div>
          <div className='color green-light'></div>
          <div className='color green'></div>
          <div className='color green-dark'></div>
          <div className='color green-xdark'></div>
          <div className='color blue-xlight'></div>
          <div className='color blue-light'></div>
          <div className='color blue'></div>
          <div className='color blue-dark'></div>
          <div className='color blue-xdark'></div>
          <div className='color red-xlight'></div>
          <div className='color red-light'></div>
          <div className='color red'></div>
          <div className='color red-dark'></div>
          <div className='color red-xdark'></div>
          <div className='color yellow-xlight'></div>
          <div className='color yellow-light'></div>
          <div className='color yellow'></div>
          <div className='color yellow-dark'></div>
          <div className='color yellow-xdark'></div>
          <div className='color gray-xlight'></div>
          <div className='color gray-light'></div>
          <div className='color gray'></div>
          <div className='color gray-dark'></div>
          <div className='color gray-xdark'></div>
        </div>
        <h2>Alerts</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Alert type='info' message='asdf' />
          <Alert type='error' message='asdf' />
          <Alert type='success' message='asdf' />
          <Alert type='help' message='asdf' />
        </div>
        <h2>Buttons</h2>
        <div className='button-group'>
          <button>Button</button>
          <button className='button' disabled>
            Button
          </button>

          <button className='button button-with-icon'>
            <BsXLg />
            Button
          </button>
          <button className='button-selected'>Button Selected</button>
          <button className='button-primary'>Button Primary</button>
          <button className='button-primary' disabled>
            Button Primary Disabled
          </button>
        </div>
        <div>
          <button className='button-wide'>Button wide</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h2>Loading</h2>
          <div style={{ width: "15rem", height: "10rem" }}>
            <LoadingSpinner />
          </div>
          <div style={{ width: "5rem", height: "10rem" }}>
            <LoadingSpinner />
          </div>
          <LoadingSpinner />
        </div>
        <h2>Toggletip</h2>
        <Toggletip label=''>
          <p>asdf</p>
          <a href='google.com'>asdf</a>
        </Toggletip>
        <h2>Tooltip</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Tooltip
            position='right'
            tooltipElement={<Bubble value='?' label='yellow' color='yellow' />}
          >
            Bubble as tooltipElement
          </Tooltip>
          <Tooltip tooltipElement={<Bubble label='asd' />}>
            Bubble as tooltipElement / right
          </Tooltip>
          <Tooltip bubbleData={{ label: "Hi", color: "red" }}>
            Bubble Demo
            <Bubble value='?' label='yellow' color='yellow' />
          </Tooltip>
          <Tooltip>Tooltip element default</Tooltip>
          <Tooltip>
            <p>p element tooltip</p>
          </Tooltip>
          <Tooltip position='right'>Tooltip element default right</Tooltip>
          <Tooltip position='left'>Tooltip element default left</Tooltip>
          <Tooltip>
            <div style={{ width: "10rem", height: "10rem" }}>10x10 rem</div>
          </Tooltip>
        </div>
        <h2>Bubbles</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Bubble value={5} label='asdf' />
          <Bubble label='asd' />
          <Bubble value={"100%"} color='green' label='green' />
          <Bubble value={"1%"} color='green-light' label='green-light' />
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
        <h2>Result Bubbles</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ResultBubble
            label='test'
            positive={0}
            negative={0}
            not_decided={0}
          />
          <div style={{ width: "3rem" }}>
            <ResultBubble
              label='test'
              positive={0}
              negative={0}
              not_decided={0}
            />
          </div>
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
          filters={["Tooltip", "Alert", "Accordion"]}
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
          exists: true,
          componentTested: true,
          amountOfTests: 3,
        },
        {
          name: "Alert",
          alternativeComponentNames: "",
          accessibilityScore: 44,
          agreementScore: 33,
          modes: [],
          exists: false,
          componentTested: true,
          amountOfTests: 3,
        },
      ],
    },
  ],
  linkHome: "",
  linkDocs: "",
};

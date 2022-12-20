import React from "react";
import { library } from "../types";
import Alert from "./Alert";
import CountBubble from "./CountBubble";
import LinkButton from "./LinkButton";
import ScoreBubble from "./ScoreBubble";

type LibraryCardProps = {
  library: library;
};

const LibraryCard = ({ library }: LibraryCardProps) => {
  const currentVersion = library.versions.find(
    (version) => library.currentVersion === version.version
  );

  return (
    <article key={library._id.toString()} className='library-card'>
      <header>{library.title} </header>
      <div className='library-card-main'>
        {currentVersion &&
        currentVersion.amountOfComponentsTested !== 0 &&
        currentVersion.amountOfComponentsTested !== undefined &&
        currentVersion.accessibilityScore !== undefined ? (
          <>
            <ScoreBubble score={currentVersion.accessibilityScore} />
            <CountBubble count={currentVersion.amountOfComponentsTested} />
          </>
        ) : (
          <Alert message='There are currently no tested components for this library' />
        )}
      </div>
      <div className='library-card-aside'>
        <LinkButton
          to={library._id}
          className='button-wide'
          label='Show More'
        />
      </div>
    </article>
  );
};

export default LibraryCard;

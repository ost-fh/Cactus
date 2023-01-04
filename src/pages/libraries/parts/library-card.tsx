import React from "react";
import { library } from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import LinkButton from "../../../shared/components/link-button";
import ScoreBubble from "../../../shared/components/score-bubble";

import "./library-card.css";

type LibraryCardProps = {
  library: library;
};

const LibraryCard = ({ library }: LibraryCardProps) => {
  const currentVersion = library.versions.find(
    (version) => library.currentVersion === version.version
  );

  return (
    <article key={library._id.toString()} className='library-card'>
      <header className='library-card-header'>
        <h3>{library.title}</h3> Version: {library.currentVersion}{" "}
        {library.versions.length > 1 && (
          <small>(older versions available)</small>
        )}
      </header>
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
          <Alert
            message={`There are currently no tested components for this  ${
              library.versions.length > 1 ? "version" : "library"
            }`}
          />
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

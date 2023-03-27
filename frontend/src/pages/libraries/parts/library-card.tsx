import React, { useEffect, useState } from "react";
import { Library, Version } from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import LinkButton from "../../../shared/components/link-button";
import ScoreBubble from "../../../shared/components/score-bubble";

import "./library-card.scss";
import Bubble from "../../../shared/components/bubble";

type LibraryCardProps = {
  library: Library;
  filters?: string[];
  focusScore?: string;
  filterState?: "true" | "neutral" | "false";
};

type filterScore = {
  name: string;
  filterState: "true" | "neutral" | "false";
  score?: number;
};

const LibraryCard = ({
  library,
  filterState,
  filters = [],
  focusScore,
}: LibraryCardProps) => {
  const [filterScores, setFilterScores] = useState<filterScore[]>([]);
  const [currentVersion, setCurrentVersion] = useState<Version>();

  useEffect(() => {
    const currentVersion = library.versions.find(
      (version) => library.currentVersion === version.version
    );
    setCurrentVersion(currentVersion);
  }, [library]);

  // extract scores of evaluated components
  useEffect(() => {
    if (filters.length > 0) {
      let newFilterScores: filterScore[] = [];
      filters.forEach((filter) => {
        const component = currentVersion?.components.find(
          (component) => component.name === filter
        );
        if (component) {
          const newFilterScore: filterScore = {
            name: filter,
            filterState: "true",
            score: component.accessibilityScore,
          };
          newFilterScores.push(newFilterScore);
        } else {
          const newFilterScore: filterScore = {
            name: filter,
            filterState: "neutral",
          };
          newFilterScores.push(newFilterScore);
        }
      });
      setFilterScores(newFilterScores);
    }
  }, [currentVersion, filters]);

  return (
    <article
      key={library._id.toString()}
      className={`library-card ${
        filterState ? `library-card-${filterState}` : ""
      }`}
    >
      <header className='header'>
        <h3>{library.title}</h3> Version: {library.currentVersion}{" "}
        {library.versions.length > 1 && (
          <small>(older versions available)</small>
        )}
      </header>
      <div className='main'>
        <div className='main-scores'>
          {focusScore && (
            <Bubble value={focusScore + "%"} label='Focus Score' color='blue' />
          )}
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

        {filterScores.length > 0 && (
          <>
            <div className='filter-scores'>
              <p>Components: </p>
              {filterScores.map((filterScore) => {
                if (filterScore.filterState === "true")
                  return (
                    <Bubble
                      key={filterScore.name + library._id}
                      value={filterScore.score + "%"}
                      label={filterScore.name}
                      color='green'
                    />
                  );
                if (filterScore.filterState === "neutral")
                  return (
                    <Bubble
                      key={filterScore.name + library._id}
                      value={"?"}
                      label={filterScore.name}
                      color='yellow'
                    />
                  );
                if (filterScore.filterState === "false")
                  return (
                    <Bubble
                      key={filterScore.name + library._id}
                      value={"X"}
                      label={filterScore.name}
                    />
                  );

                return "error";
              })}
            </div>
            <div className='messages'>
              {filterState === "neutral" && (
                <Alert message='Not all or none of the selected components are tested yet or night not be in the library.' />
              )}
              {filterState === "false" && (
                <Alert message='One or more of the selected components are not available in this library.' />
              )}
            </div>
          </>
        )}
      </div>
      <div className='aside'>
        <LinkButton
          to={library._id}
          className='button-wide'
          label='Show More'
          ariaLabel={`${library.title} show more`}
        />
      </div>
    </article>
  );
};

export default LibraryCard;

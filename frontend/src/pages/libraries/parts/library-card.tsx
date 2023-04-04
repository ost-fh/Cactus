import React, { useEffect, useState } from "react";
import { Library, Version } from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import LinkButton from "../../../shared/components/link-button";
import ScoreBubble from "../../../shared/components/score-bubble";

import "./library-card.scss";
import Bubble from "../../../shared/components/bubble";
import { createFilterScores, filterScore } from "./library-card-helpers";
import { BsQuestionLg, BsXLg } from "react-icons/bs";

type LibraryCardProps = {
  library: Library;
  filters?: string[];
  focusScore?: string;
  filterState?: "true" | "incomplete" | "neutral" | "false";
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
    if (filters.length > 0 && currentVersion) {
      const newFilterScores = createFilterScores(filters, currentVersion);
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

        {currentVersion &&
          currentVersion?.components.length > 0 &&
          filterScores.length > 0 && (
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
                  if (filterScore.filterState === "incomplete")
                    return (
                      <Bubble
                        key={filterScore.name + library._id}
                        value={"incomplete"}
                        label={filterScore.name}
                        color='yellow'
                      />
                    );
                  if (filterScore.filterState === "neutral")
                    return (
                      <Bubble
                        key={filterScore.name + library._id}
                        value={
                          <BsQuestionLg
                            size={"0.8rem"}
                            title='not recorded yet'
                          />
                        }
                        label={filterScore.name}
                        color='yellow'
                      />
                    );
                  if (filterScore.filterState === "false")
                    return (
                      <Bubble
                        key={filterScore.name + library._id}
                        value={<BsXLg size={"0.8rem"} title='excluded' />}
                        label={filterScore.name}
                        color='red'
                      />
                    );

                  return "error";
                })}
              </div>
              <div className='messages'>
                {filterState === "neutral" && (
                  <Alert message='Not all or none of the selected components are tested yet or might not be in the library.' />
                )}
                {filterState === "false" && (
                  <Alert
                    type='error'
                    message='One or more of the selected components are not available in this library.'
                  />
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

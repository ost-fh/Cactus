import React, { useEffect, useState } from "react";
import Alert from "../../../shared/components/alert";
import { library } from "../../../shared/resources/types";
import LibraryCard from "./library-card";

type LibraryListProps = {
  libraries: library[];
  sorting: string;
  filters: string[];
  focusMode: boolean;
};
enum filterResults {
  true,
  neutral,
  false,
}

interface focusScore {
  library_id: string;
  score: number;
}

const LibraryList = ({
  libraries,
  sorting,
  filters,
  focusMode,
}: LibraryListProps) => {
  // Library Buckets
  const [noFilter, setNoFilter] = useState<library[]>([]);
  const [filterTrue, setFilterTrue] = useState<library[]>([]);
  const [filterNeutral, setFilterNeutral] = useState<library[]>([]);
  const [filterFalse, setFilterFalse] = useState<library[]>([]);
  const [focusScores, setFocusScores] = useState<focusScore[]>([]);

  useEffect(() => {
    // reset buckets if no filters are applied
    if (filters.length === 0) {
      // sorting toDo
      setNoFilter(libraries);
      setFilterTrue([]);
      setFilterNeutral([]);
      setFilterFalse([]);
      return;
    }

    // empty buckets
    let trueTemp: library[] = [];
    let neutralTemp: library[] = [];
    let falseTemp: library[] = [];
    let focusScores: focusScore[] = [];

    libraries.forEach((library) => {
      // standard filter true
      let filterResult: filterResults = filterResults.true;

      // get data from current version
      const currentVersion = library.versions.find(
        (version) => library.currentVersion === version.version
      );

      // if a component from the filters is not found, it sorts into neutral
      for (const filter of filters) {
        if (
          !currentVersion?.components.find(
            (component) => component.name === filter
          )
        ) {
          filterResult = filterResults.neutral;
          break;
          // TODO -> differentiate between completed and not completly tested component
        }
        // TODO later differentiate component exists/does not exist
      }

      if (focusMode && filterResult === filterResults.true) {
        let scores: number[] = [];
        for (const filter of filters) {
          const component = currentVersion?.components.find(
            (component) => component.name === filter
          );
          component && scores.push(component.accessibilityScore);
        }
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        focusScores.push({
          library_id: library._id,
          score: average,
        });
      }

      // sort into buckets
      if (filterResult === filterResults.true) {
        trueTemp = [...trueTemp, library];
      }
      if (filterResult === filterResults.neutral) {
        neutralTemp = [...neutralTemp, library];
      }
      // TODO Enable once exclusion is implemented
      // if (filterResult === filterResults.false) {
      //   falseTemp = [...falseTemp, library];
      // }
    });

    // sorting TODO

    setFocusScores(focusScores);
    setNoFilter([]);
    setFilterFalse(falseTemp);
    setFilterNeutral(neutralTemp);
    setFilterTrue(trueTemp);
  }, [filters, focusMode, libraries]);

  return (
    <section className='library-list'>
      {noFilter &&
        noFilter.map((library: library) => (
          <LibraryCard key={library._id} library={library} />
        ))}
      {filterTrue &&
        filterTrue.map((library: library) => {
          const focusScore = focusScores.find(
            (scores) => scores.library_id === library._id
          );
          return (
            <LibraryCard
              filterState='true'
              filters={filters}
              key={library._id}
              library={library}
              focusScore={focusMode ? focusScore?.score : undefined}
            />
          );
        })}
      {filters.length !== 0 && filterTrue.length === 0 && (
        <Alert
          type='error'
          message={`There is no library that fits all filters ${
            focusMode ? "and therefore no focusmode is calculated" : ""
          }`}
        />
      )}
      {filterNeutral &&
        filterNeutral.map((library: library) => (
          <LibraryCard
            filterState='neutral'
            filters={filters}
            key={library._id}
            library={library}
          />
        ))}
      {filterFalse &&
        filterFalse.map((library: library) => (
          <LibraryCard
            filterState='false'
            filters={filters}
            key={library._id}
            library={library}
          />
        ))}
    </section>
  );
};

export default LibraryList;

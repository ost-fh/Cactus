import React, { useEffect, useState } from "react";
import Alert from "../../../shared/components/alert";
import { library } from "../../../shared/resources/types";
import LibraryCard from "./library-card";
import {
  LibraryBuckets,
  sortLibrariesIntoBuckets,
} from "./library-list-helpers";

type LibraryListProps = {
  libraries: library[];
  sortBy: string;
  filters: string[];
};

const LibraryList = ({ libraries, sortBy, filters }: LibraryListProps) => {
  const [libraryBuckets, setLibraryBuckets] = useState<LibraryBuckets>();

  useEffect(() => {
    setLibraryBuckets(sortLibrariesIntoBuckets(libraries, sortBy, filters));
  }, [filters, libraries, sortBy]);

  return (
    <section className='library-list'>
      {libraryBuckets &&
        libraryBuckets.noFilter.map((library: library) => (
          <LibraryCard key={library._id} library={library} />
        ))}
      {libraryBuckets &&
        libraryBuckets.trueFiltered.map((library: library) => {
          const focusScore = libraryBuckets.focusScores.find(
            (scores) => scores.library_id === library._id
          );
          return (
            <LibraryCard
              filterState='true'
              filters={filters}
              key={library._id}
              library={library}
              focusScore={focusScore?.score}
            />
          );
        })}
      {filters.length !== 0 && libraryBuckets?.trueFiltered.length === 0 && (
        <Alert
          type='error'
          message={
            "There is no library that has all selected components tested"
          }
        />
      )}
      {libraryBuckets?.neutralFiltered.map((library: library) => {
        const focusScore = libraryBuckets.focusScores.find(
          (scores) => scores.library_id === library._id
        );
        return (
          <LibraryCard
            filterState='neutral'
            filters={filters}
            key={library._id}
            library={library}
            focusScore={focusScore?.score}
          />
        );
      })}
      {libraryBuckets?.falseFiltered.map((library: library) => (
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

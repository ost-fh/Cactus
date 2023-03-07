import React, { useEffect, useState } from "react";
import { library } from "../../../shared/resources/types";
import LibraryCard from "./library-card";

type LibraryListProps = {
  libraries: library[];
  sorting: string;
  filters: string[];
  focusMode: boolean;
};

const LibraryList = ({
  libraries,
  sorting,
  filters,
  focusMode,
}: LibraryListProps) => {
  const [filterTrue, setFilterTrue] = useState<library[]>([]);
  const [filterNeutral, setFilterNeutral] = useState<library[]>([]);
  const [filterFalse, setFilterFalse] = useState<library[]>([]);
  enum filterResults {
    true,
    neutral,
    false,
  }

  useEffect(() => {
    console.log(filters);

    // reset buckets if no filters are applied
    if (filters.length === 0) {
      setFilterTrue(libraries);
      setFilterNeutral([]);
      setFilterFalse([]);
      return;
    }

    // empty buckets
    let trueTemp: library[] = [];
    let neutralTemp: library[] = [];
    let falseTemp: library[] = [];

    libraries.forEach((library) => {
      // standard filter true
      let filterResult = filterResults.true;

      // get data from current version
      const currentVersion = library.versions.find(
        (version) => library.currentVersion === version.version
      );

      // if a component from the filters is not found, it sorts into neutral
      filters.forEach((filter) => {
        if (
          !currentVersion?.components.find(
            (component) => component.name === filter
          )
        ) {
          // -> differentiate between completed and not completly tested component
          filterResult = filterResults.neutral;
        }

        // später unterscheiden component exists/does not exist
      });

      // sort into buckets
      if (filterResult === filterResults.true) {
        trueTemp = [...trueTemp, library];
      }
      if (filterResult === filterResults.neutral) {
        neutralTemp = [...neutralTemp, library];
      }
      if (filterResult === filterResults.false) {
        falseTemp = [...falseTemp, library];
      }
    });
    setFilterFalse(falseTemp);
    setFilterNeutral(neutralTemp);
    setFilterTrue(trueTemp);
  }, [
    filterResults.false,
    filterResults.neutral,
    filterResults.true,
    filters,
    libraries,
  ]);

  return (
    <section className='library-list'>
      <p>true</p>
      {filterTrue &&
        filterTrue.map((library: library) => (
          <LibraryCard key={library._id} library={library} />
        ))}
      <p>neutral</p>
      {filterNeutral &&
        filterNeutral.map((library: library) => (
          <LibraryCard key={library._id} library={library} />
        ))}
      <p>false</p>
      {filterFalse &&
        filterFalse.map((library: library) => (
          <LibraryCard key={library._id} library={library} />
        ))}
    </section>
  );
};

export default LibraryList;

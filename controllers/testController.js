const { Library, Criterium } = require("../models/libraryModel");

const postTestResult = async (req, res) => {
  console.log(req.body);
  const data = req.body.testData;

  const criteria = req.body.criteria.map(
    (item) =>
      new Criterium({
        text: item.text,
        help: item.help,
        choice: item.choice,
        comment: item.comment,
      })
  );
  //evtl. check
  const library = await Library.findById(data.libraryId);
  console.log(library);
  // create version if not exists
  if (library.testsByVersion.length === 0) {
    library.testsByVersion.push({
      version: data.libraryVersion,
      components: [],
    });
  }
  console.log("---version---");
  // find version
  const version = library.testsByVersion.find(
    (item) => item.version === data.libraryVersion
  );
  // TODO handle not found -> Refactoring

  // find components
  if (version.components.length === 0) {
    // console.log("found version, no components");
    version.components.push({
      name: data.component,
      modes: [],
    });
  }
  console.log(version);
  console.log("---component created---");
  console.log(library);
  const component = version.components.find(
    (item) => item.name === data.component
  );
  // TODO handle not found
  console.log(component);
  if (component.modes.length === 0) {
    component.modes.push({ name: data.testMode, tests: [] });
  }
  const mode = component.modes.find((item) => item.name === data.testMode);

  mode.tests.push({ testerName: "implement_me", criteria: criteria });
  console.log(mode);

  await library.save();

  console.log("---library---");
  console.log(library);

  res.status(200);
};

module.exports = postTestResult;

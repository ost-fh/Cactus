const { Library, Criterium } = require("../models/libraryModel");
const User = require("../models/userModel");
const { scoreLibrary } = require("../services/scoring");

const postTestResult = async (req, res) => {
  const data = req.body.testData;

  // prepare criteria
  const criteria = req.body.criteria.map(
    (item) =>
      new Criterium({
        criterium_id: item._id,
        text: item.text,
        help: item.help,
        choice: item.choice,
        comment: item.comment,
      })
  );

  const library = await Library.findById(data.libraryId);
  if (!library) {
    console.error("Library not found: ID invalid");
  }

  if (
    library.versions.length === 0 ||
    !library.versions.find((item) => item.version === data.libraryVersion)
  ) {
    library.versions.push({
      version: data.libraryVersion,
      components: [],
    });
  }

  const version = library.versions.find(
    (item) => item.version === data.libraryVersion
  );
  // TODO handle not found

  if (
    version.components.length === 0 ||
    !version.components.find((item) => item.name === data.component)
  ) {
    version.components.push({
      name: data.component,
      modes: [],
    });
  }

  const component = version.components.find(
    (item) => item.name === data.component
  );

  if (
    component.modes.length === 0 ||
    !component.modes.find((item) => item.name === data.testMode)
  ) {
    component.modes.push({ name: data.testMode, tests: [] });
  }
  const mode = component.modes.find((item) => item.name === data.testMode);
  const { username } = await User.findById(req.user.id);
  mode.tests.push({ testedBy: username, criteria: criteria });

  await library.save();

  scoreLibrary(data.libraryId);

  res.status(200);
};

module.exports = postTestResult;

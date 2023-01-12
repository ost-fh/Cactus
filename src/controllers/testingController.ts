import { libraryModel, criteriumModel } from "../models/libraryModel";
import User from "../models/userModel";
import { scoreLibrary } from "../services/scoring";
import { Request, Response } from "express";

const postTestResult = async (req: Request, res: Response) => {
  const data = req.body.testData;

  // prepare criteria
  const criteria = req.body.criteria.map(
    (item: any) =>
      new criteriumModel({
        criterium_id: item._id,
        text: item.text,
        help: item.help,
        choice: item.choice,
        comment: item.comment,
      })
  );

  const library = await libraryModel.findById(data.libraryId);
  if (!library) {
    console.error("Library not found: ID invalid");
    return;
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

  if (version) {
    if (
      version.components.length === 0 ||
      !version.components.find((item) => item.name === data.component)
    ) {
      version.components.push({
        name: data.component,
        alternativeComponentNames: data.alternativeComponentNames,
        modes: [],
      });
    }

    const component = version.components.find(
      (item) => item.name === data.component
    );
    if (component) {
      if (
        component.modes.length === 0 ||
        !component.modes.find((item) => item.name === data.testMode)
      ) {
        component.modes.push({
          name: data.testMode,
          tests: [],
        });
      }
      const mode = component.modes.find((item) => item.name === data.testMode);
      if (mode) {
        const userdata = await User.findById(req.user.id);
        mode.tests.push({
          testedBy: userdata!.username,
          criteria: criteria,
          userBrowser: data.userBrowser,
          userOs: data.userOs,
        });
      }
    }
  }
  await library.save();
  // scoreLibrary(data.libraryId);

  res.status(200);
};

export default postTestResult;

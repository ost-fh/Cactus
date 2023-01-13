import { libraryModel, versionModel } from "../models/libraryModel";
import { scoreLibrary } from "../services/scoring";
import { Request, Response } from "express";

export const getLibraries = async (req: Request, res: Response) => {
  const libraries = await libraryModel.find();
  res.status(200).json(libraries);
};

export const getLibrary = async (req: Request, res: Response) => {
  try {
    const library = await libraryModel.findById(req.params.id);
    res.status(200).json(library);
  } catch (error) {
    res.status(400);
    res.json({ message: "Library not found" });
    return;
  }
};

export const postLibrary = async (req: Request, res: Response) => {
  const { title, linkHome, linkDocs, currentVersion } = req.body;
  if (!(title && linkHome && linkDocs && currentVersion)) {
    res.status(400);
    res.json({ message: "please add all required fields" });
    return;
  }
  const library = await libraryModel.create({
    title,
    linkHome,
    linkDocs,
    currentVersion,
    versions: [{ version: currentVersion }],
  });
  console.log(
    `POST library: added new library ${library.title} id: ${library._id}`
  );
  res.status(200).json(library);
};

export const postNewVersion = async (req: Request, res: Response) => {
  const { newVersion } = req.body;
  if (!newVersion) {
    res.status(400);
    res.json({ message: "please provide a version number" });
    return;
  }
  const library = await libraryModel.findById(req.params.id);
  if (library) {
    if (library.versions.find((item) => item.version === newVersion)) {
      res.status(400);
      res.json({ message: "version already exists" });
      return;
    }
    library.versions.push(await versionModel.create({ version: newVersion }));
    library.currentVersion = newVersion;
    await library.save();
    console.log(
      `POST library/:id: added new version ${newVersion} to ${library.title}, id: ${library._id}`
    );
    res.status(200).json(library);
  }
};

const mongoose = require("mongoose");

const criteriumSchema = mongoose.Schema({
  text: String,
  help: String,
  choice: String,
  comment: String,
});

const testSchema = mongoose.Schema({
  testerName: {
    type: String,
    required: true,
  },
  criteria: [criteriumSchema],
});

const modeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tests: [testSchema],
});

const componentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  modes: [modeSchema],
});

const versionSchema = mongoose.Schema({
  version: String,
  components: [componentSchema],
});

const librarySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // componentsTested: {
    //   type: Number,
    // },
    // totalScore: {
    //   type: Number,
    // },
    linkHome: {
      type: String,
      required: true,
    },
    linkDocs: {
      type: String,
      required: true,
    },
    currentVersion: {
      type: String,
      required: true,
    },
    testsByVersion: [versionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Library: mongoose.model("Library", librarySchema),
  Version: mongoose.model("Version", versionSchema),
  Criterium: mongoose.model("Criterium", criteriumSchema),
};

# Contributing

When it comes to open source, there are different ways you can contribute, all of which are valuable.

- [Tell us that something is wrong](#tell-us-that-something-is-wrong)
- [Add or modify a component and its criteria](#add-or-modify-a-component-and-its-criteria)
- [Modify the cactus score](#modify-the-cactus-score)
- [Suggest a missing library or library version](#suggest-a-missing-library-or-library-version)
- [Suggest new features or improve solution](#suggest-new-features-or-improve-solution)

**Prerequisites**

Before you can start contributing to our project, you should have the following:

- A GitHub account
- Basic understanding of Project Cactus and its purpose
- An understanding for the current challenges in supporting accessibility in the web
- Knowledge of Git and GitHub is benefical or required

**Guideline**

First check the [existing issues](https://github.com/ost-fh/cactus/issues?q=is%3Aissue)  for compliance. Because it's possible the is already a ongoing discussion or someone else is already working on something similar. If you didn't find something suitable, create a new issue describing what you want to change.

## Tell us that something is wrong

We can't get everything right. And let's be honest, this project represents a huge amount of work by a lot of people. We are human and we make mistakes. But in order for us to fix those mistakes, we must first know about them. Please [create an issue](https://github.com/ost-fh/cactus/issues) to bring something to our attention.

When creating an issue, please be as detailed as you can.

## Add or modify a component and its criteria

1. [Create an issue](https://github.com/ost-fh/cactus/issues) and discuss your topic
2. Fork the repository
3. Clone the forked repository
4. Create a new branch in the forked repository
5. Make changes
   - Add or edit the appropriate yaml file in 5the folder `backend/src/components/`
   - The file structure is as follows
        ```
        component: Accordion
        alternativeComponentNames: Disclosure
        description: An accordion is a ...
        imageUrl: /accordion.png
        testModes:
          - testMode: Screenreader
            criteria:
              - _id: 1
                text: Any hidden text ...
        ```

6. Commit the changes
7. Push changes to your forked repository
8. Create a pull request
9. Wait for review and feedback
10. Merge changes

_If you need further instructions, the process is more detailed described in this [manual](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) of GitHub_

For a new component, it's required to add a suitable component icon in the folder `frontend/public/`

### Modify the cactus score

If you are interested to update the cactus score of a library, you have to do some tests on the [website](https://cactus.sifs0003.infs.ch/libraries)


### Suggest a missing library or library version

New libraries can be added on the [library overview page](https://cactus.sifs0003.infs.ch/libraries), a new version in the library detail page.

### Suggest new features or improve solution

The following steps will get you setup to contribute changes to this repo:

1. Fork this repo.

2. Clone your forked repo: `git clone git@github.com:{your_username}/cactus.git`

3. Run `npm install` to install dependencies.


**Tests**

The Cactus project uses Jest for testing. After implementing your contribution, write tests for it. Just create a new test file in the same folder like the changed file or add additional tests to the appropriate existing file.

Before submitting your PR, run `npm test` to make sure there are no (unintended) breaking changes.

## License

By contributing your code to the Cactus GitHub repository, you agree to license your contribution under the [MIT](./LICENSE) license.

# Top books of all time

## :joystick: Features

- **Book list**: Browse through a list of books.
- **Book search**: Search for words in the book title and synopsis.
- **Book details**: Select the book from the list to view more details.
- **Comment**: Leave comments on the book details page.

## :computer: Tech stack

- [Vue.js](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) for unit testing
- [Cypress](https://www.cypress.io/) for E2E testing
- [Prettier](https://prettier.io/) for code style

## :page_facing_up: Prerequisites

Check the `engines` property in [package.json](package.json) for the suggested Node.js and npm versions.

## :hammer_and_wrench: Installation

To get started with the project install the dependencies in the root and server folders with:

```
npm install
```

After installing the dependencies, you can start the development server by running:

```
npm start
```

And the local server that mimicks the backend in the server folder with:

```
npm run server
```

The application should be available at http://localhost:5173
Alternatively check the terminal output to see the url of the app.

## :hammer: Testing

This project uses Vitest for unit testing. Run the following command to execute the tests:

```
npm test
```

This project uses Cypress for E2E testing. Run the following command to execute the tests:

```
npm run cypress:open
```

## :building_construction: Building

Run the next command to build the app:

```
npm run build
```

By default, the build output will be placed in the `dist` folder.

### Testing the build locally

Once you've built the app, you can test it locally by running:

```
npm run preview
```

The Vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173.

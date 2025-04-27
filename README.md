# Hi there

To get started, run

### `npm install`

To install packages being used, then

### `npm run dev`

To start the server

## Folder structure

All modules in files are exported from the `index.js` file in the base folder except in `/assets` where each subfolder contains their own `index.js`. E.g
`/constants` _Folder_

`/routes.js` _File with modules_

`/carouselSettings.js` _File with modules_

`/index.js` _All modules from routes and carouselSettings should be exported from here_

### Order

Modules being exported from index.js file are arranged in alphabetical order. E.g

`export { Abc } from 'a'`

`export { Bcd } from 'a'`

All`(*)` exports comes before named exports and are arranged according to their file names E.g

`export * from 'a'`

`export * from 'b'`

`export { Abc } from 'a'`

# CI / CD
To have access to our CI/CD server, contact admin to give register your email. 
This gives you access to check deployment, check deployment error.

You can also confirm if your commit to codebase is build. 

> For developers, the branch for CI/CD is the dev branch. Any testing for deployment is done in our development server ${hostname}.site.

Do not attempt to change anything in the development CI/CD pipeline. 

contact <samuelemyrs@gmail.com> for access to the CI/CD pipeline.

Our base CI/CD server is COOLIFY. 
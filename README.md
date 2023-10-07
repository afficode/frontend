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

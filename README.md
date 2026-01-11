# Boonfu Frontend Repo

A scalable frontend built with React 18 and JavaScript.

---

## 🛠 Tech Stack

**Core:** React 18, JavaScript, Vite
**State Management:** Context API, React Query
**Styling:** TailwindCSS, Flowbite, DaisyUI
**Forms:** Formik + Yup
**CI/CD:** Coolify

## 🚀 Getting Started

Follow these steps to set up your local development environment.

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/afficode/frontend.git
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

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

## Naming conventions

Use camel casing for

- Modules names (e.g PalletList)
- Prop names e.g (propName)
- Image and svg names (e.g MoneyBag.png)

Use underscore to separate words for

- Object keys (e.g first_name)
- Input names

Use uppercase and underscore for

- Constants that are not functions (e.g PUBLIC_KEY)

## Branch naming conventions

For branch naming use these prefix;

- `feat`: Introduces a new feature.
- `fix`: Patches a bug.
- `chore`: Changes to the build process, auxiliary tools, or libraries, documentation generation, etc.
- `docs`: Changes to documentation.
- `style`: Changes that do not affect the meaning of the code (e.g., whitespace, formatting).
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `perf`: Improves performance.
- `test`: Adds missing tests or correcting existing tests.
- `build`: Changes that affect the build system or dependencies.
- `ci`: Changes to CI configuration files or scripts.

##### Example `chore`;

- Updating a build script.
- Modifying the `.gitignore` file.
- Updating dependencies.
- Refactoring code comments.

##### Why use chore?

- To clearly indicate that the commit doesn't involve a feature or bug fix.
- To improve the readability and maintainability of the commit history.
- To help automate the process of generating changelogs and release notes.
  **Note**: The term "chore" is not part of the Conventional Commits specification, but it is a commonly used type.

## Deployment

**Do not push directly to the main or dev branch** always make a pull request from your branch to the branch you wish to merge with.

Branch naming convention

- feat/repo_setup
- fix/homepage

## Things to avoid

- **Pushing directly to main or dev branch**
- Improper naming conventions
- Installing unused packages
- Not declaring universal constants that could change in a single file (constants folder)

## CI / CD

To have access to our CI/CD server, contact admin to give register your email.
This gives you access to check deployment, check deployment error.

You can also confirm if your commit to codebase is build.

> For developers, the branch for CI/CD is the dev branch. Any testing for deployment is done in our development server ${hostname}.site.

Do not attempt to change anything in the development CI/CD pipeline.

contact <samuelemyrs@gmail.com> for access to the CI/CD pipeline.

Our base CI/CD server is COOLIFY.

##### Happy coding!

# NPM Template

[![CI](https://github.com/k-kuroguro/npm-template/actions/workflows/main.yaml/badge.svg)](https://github.com/k-kuroguro/npm-template/actions/workflows/main.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Setup

1. Change library name in below files.
   - `package.json`
      - name
      - bin
      - homepage
      - repository
      - bugs
   - `README.md`
      - title
      - badge of github actions

2. Execute `npm i` for installing node modules and remake `package-lock.json`.

# Publish

1. Check if it exists same name library.
   `npm info [library-name]`

2. Login to npm.
   `npm login`

3. Publish by below command.
   `npm publish`

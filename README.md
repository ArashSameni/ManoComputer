# ManoComputer

ManoComputer is an assembler and hardware simulator for Mano's basic computer. It's fully implemented based on the Mano's book.

## Features

- Fully Implemented
- Amazing UI
  - Multi Theme
  - Responsive
- Cross Platform
- Uses API

## Tech

ManoComputer uses a number of open source projects to work properly:

- FrontEnd
  - [React](https://github.com/facebook/react) - A JavaScript library for building user interfaces.
  - [Electron](https://github.com/electron/electron) - Build cross-platform desktop apps with JavaScript, HTML, and CSS
- BackEnd
  - [Flask](https://github.com/pallets/flask) - Python micro framework for building web applications.

## Usage

You need to have [Python 3.9](https://www.python.org/downloads/release/python-390/) or above and [NodeJS](https://nodejs.org/en/) installed on your machine.

First you have to run the backend

```bash
$ cd backend
$ env FLASK_APP=api flask run
```

Then in separate terminal run the frontend

```bash
# another terminal
$ cd frontend
$ npm i
$ npm run build
$ npm run electron-dev
```

## Screenshots

![First](https://user-images.githubusercontent.com/74505991/182549919-e5070fec-b92f-4a15-bcc6-573a3a30cddd.png)
![Second](https://user-images.githubusercontent.com/74505991/182550031-bc9bdb03-9ae2-41ca-8559-78c0766f03cb.png)

# InceptionU Project 2 &ndash; Calgary FitFriends

**Status:**  Inactive<br />
*This project is not currently being developed but it may be revisited in the future.*

## About This Project

I was on a team with [Zack Spring Chief](https://github.com/JZackSpringChief) and [J.J.](https://github.com/Astrognarly).  This was our submission for Project 2 in the [Full Stack Developer](https://www.inceptionu.com/full-stack-developer-program/) program at [InceptionU](https://www.inceptionu.com/) (we were given three projects to do altogether).

### The Assignment

The goal of Project 2 was to create a full stack app that addresses a unique challenge or problem.

We were given additional features to strive for, such as:

- implement full [CRUD functionality](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) functionality
- have more than one or two web pages
- create an API that handles more than just data
- use a document-style database (like [MongoDB](https://www.mongodb.com/))
- use a third-party API (e.g. an open data set)
- [React](https://react.dev/) with a context API, a global state library and/or other features
- third-party components imported into [React](https://react.dev/)
- authentication
- use an SQL database
- an administrator's companion application

### The Result

Alas, time ran out on us and we weren't able to implement many of our planned features.

### The True Goal

The true goal of this project *wasn't* to create a whiz-bang application.  The true goal was to **learn**.

When we first met as a team, we discussed our skills &amp; experiences and what we needed to learn most during this project.  We decided that I would be leader &amp; mentor, [Zack](https://github.com/JZackSpringChief) would work mostly on the front end and [J.J.](https://github.com/Astrognarly) would begin by working on the back end.

## How to Install

### Prerequisites

You will need:

- [npm](https://www.npmjs.com/package/npm)

### Installation

Use the green `<> Code` button to either clone this repository or download the zip file.

Next, open a command shell and change to the `code/backend` directory.  Create a text file called `.env` with the following content:

```
MAPBOX_ACCESS_TOKEN=null
PORT=4201
```

Next, install the necessary JavaScript packages by executing this command:

```
npm install
```

Next, change to the `code/frontend` directory.  Create a text file called `.env` with the following content:

```
VITE_SERVER_URL_ROOT=http://localhost:4201
```

Finally, install the necessary JavaScript packages by executing this command:

```
npm install
```

## How to Use

To start the back end, open a command shell and change to the `code/backend` directory, then enter the following command:

```
npm run start
```

To start the front end, open another command shell and change to the `code/frontend` directory, then enter the following command:

```
npm run dev
```

You can now use any modern web browser to browse to `localhost:4200`.

The following login credentials are available:

|UserID |Password|
|-------|--------|
|Adam   |Adam    |
|Eve    |Eve     |
|Serpent|Serpent |

To stop the back end and front end, type `Ctrl-C` or send a SIGINT signal to them.

## Documentation

See the [openapi.yaml](openapi.yaml) file for the complete API specification.  **TIP:**  open this file in an [OpenAPI Editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/kwoodman1970/InceptionU-Project2/main/openapi.yaml) for easier viewing.

Our development methodology was as follows:

1. [The Assignment](docs_methodology/1_Assignment.md)
2. [Dreaming](docs_methodology/2_Dreaming.md)
3. [Identifying the Problem](docs_methodology/3_Problem.md)
4. [The Reveal](docs_methodology/4_Reveal.md)
5. [Focusing](docs_methodology/5_Focusing.md)
6. [The Result](docs_methodology/6_Result.md)

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [fs.js](https://www.npmjs.com/package/fs-js)
- [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [OpenAPI](https://www.openapis.org/) ([YAML](https://yaml.org/))

## TODO

It's a long, long list.

## How to Contribute

I'm not accepting contributions to this project.

## Copyright Notice

The files in this repository are made available under the [GitHub Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#5-license-grant-to-other-users).  Beyond that, I [reserve all other rights](https://choosealicense.com/no-permission/).

Copyright &copy; 2023 Kevin Woodman
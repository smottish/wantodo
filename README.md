## Getting started

### Prerequisites

- MongoDB Atlas account
- Active MongoDB database
- Network Access > IP Access List includes the appropriate IP address(es)

### Installation

Clone the repo
```sh
git clone git@github.com:smottish/wantodo.git
```

Install NPM packages
```sh
npm ci
```

## Usage

Run the front end
```sh
npm run frontend
```

Run the backend
```sh
MONGODB_URI="<MONGODB_URI>" npm run backend
```

Run tests
```sh
npm test
```

## Why are there a bunch of commits with messages that say "Checkpoint" with emojis?
This project started off as a prototype that was built and hosted using [Glitch](https://glitch.com/), which automatically creates these "checkpoint" commits.

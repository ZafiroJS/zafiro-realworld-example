# Contributing

## Setup

1 Clone your fork of the repository

```sh
git clone https://github.com/YOUR_USERNAME/zafiro-realworld-example.git
```

2 Setup

```sh
npm install
npm run setup
```

3 Run the tests

```sh
npm test
```

4 Run the app

```sh
npm start
```

## Guidelines

- Please try to [combine multiple commits before pushing](http://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git)

- Please use `TDD` when fixing bugs. This means that you should write a unit test that fails because it reproduces the issue, then fix the issue and finally run the test to ensure that the issue has been resolved. This helps us prevent fixed bugs from happening again in the future

- Please keep the test coverage at 100%. Write additional unit tests if necessary

- Please create an issue before sending a PR if it is going to change the public interface or includes significant architecture changes

- Feel free to ask for help from other members of the team via the chat / mailing list or github issues
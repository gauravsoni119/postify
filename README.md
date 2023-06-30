# Postify App

Application to view list of posts. It's easy to scale and reuse with ability to customize styles through scss variables.

## Tools and Technologies

### Framework

[Angular](https://angular.io/)

## Libraries

UI Library - [Angular Material](https://material.angular.io/), [Bootstrap](https://getbootstrap.com/)

Monorepo - [Nx](https://nx.dev/)

Post API - [Json placeholder](https://jsonplaceholder.typicode.com/posts)

Test runner Framework - [Jest](https://jestjs.io/docs/en/api)

##### Note:- We are using jest because it's faster than karma in the following ways:-

- It runs test in parallel
- It runs the previously failed test first
- It caches the files that need to be run
- It uses JSDOM instead of actual DOM which is faster
- It automatically find tests related to changed files

## How to run the app?

We can use the below commands to `serve`, `test`, `lint`, `build` and `format` the code:-

1. Serve - `npm start`
2. Test - `npm run test`
3. Lint - `npm run lint`
4. Build - `npm run build`
5. Format - `npm run format`

**Note**: Make sure to run `npm i` command to install all the dependencies

## Architecture

Nx monorepos are used to build **postify** app. Nx also has `monorepo pattern` that is followed to build **postify** app. The pattern allow us to build scalable and reusable apps by splitting the `app` into small and maintainable units called as `libs`. The `app` contains minimal amount of code. It's purpose is to combine different `shell` libraries and render it in browser. With fine grained libs, we can also take advantage of nx [`affected`](https://nx.dev/concepts/affected) commands. `Affected` commands will allow us to run the command against only changed code. For example, if we are doing changes in `data-access` and we need to run pipeline to perform CI/CD step. Without `affected` commands, all the steps such as `formatting`, `linting`, `tests` will be run for all libs. But with `affected` only, the pipeline will be run against the data-access or it's dependent code which will significantly reduce the CI/CD time.

![alt text](./apps/postify/src/assets/postify-arc.svg 'Architecture of app')

## Apps

The `postify` app contains following modules:-

### AppModule

Main Module of the application. Act as a starting point of the app.

### CoreModule

Module that contains global logic such as **global error handler**, **services**(such as logger, notification) and **modules**(such as AuthModule). This contains functionality that should be registered once. Let see what we have in this module:-

**Globar Error Handler**

An [ErrorHandler](https://angular.io/api/core/ErrorHandler) to handle error globally. Any error message such as `http` error or `client side` error comes here. Since it's a single place to catch all the errors we can use it to send some notifications to channels(eg. slack, hipchat) about the error occurred in app or we can post the error to some backend api which will dumps it to some database so that we can have records of all errors.

**LoggerService**

`LoggerService` is a generic singleton service to log message to console. It will log message only in `devMode` by decorating the methods(log, error and warn). In `prodMode` it will not log anything to console.

### LayoutModule

A module that manage the layout of our application. It usually contains static part of our web app such as header, footer, sidebar etc. Let us what we have in LayoutModule:-

**Header**:
Global header that should be visible across all the routes.

**router-outlet**:
All the child routes. Mostly after the login screen, all the features are rendered here via routes.

### PostsBundleModule

A lazy loaded bundle module which wraps our posts feature. It can also provide configurations for out feature. For example, it sets the base path for our `apis` via `BASE_PATH` injection token.

## Libs

The fine grained `libs` that are used in the app. We have only single domain `posts` for now. If we are going to have multiple domains such as `users`, `comments` in the future, then each domain will contain all of these libs respectively.

The following libraries are there inside our libs folder:-

### Shell

App specific library whose purpose to expose all the features used in the application. Right now we have one `posts-feature` but later on more features can be easily added. It has access to all other libs(`feature`, `data-access`, `ui`, `util`). Let's explore what we have in the shell:-

**ShellModule**: Module that assemble all the feature specific to our `posts` domain. We have only one feature which is to show the list of `posts` as cards. The features are loaded via `routes`.

### Data-Access

A library that contains all data and state management logic for the `posts`. It has access to `util` lib only. Let's explore what we have in the data-access:-

**DataService**: A service to interact with `backend apis`. The whole purpose of this service to interact with backend either by doing single api call or multiple calls.

**Store**: `ngrx` store to manage the state of the application. For now, the store contains only single state(`posts`). It contains reducers, actions, effects and selectors.

**StoreModelService**: We have a `facade` service to interact with the store. This prevents direct interaction between our code and `ngrx`, making it easier to replace `ngrx` with any other store library if needed.

### Feature

A library that contains all features such as `list of posts`, `details of post` etc. It has access to all other libs(`feature`, `data-access`, `ui`, `util`). Let see what we have in feature:-

**PostsComponent**: A feature component whose purpose is get data from `store` and pass to `ui` components.

**Ui**

The UI library contains all UI components, directives, pipes, etc. It does not have access to the `data-access`, `feature`, and `shell` libraries. Only the `util` library is allowed to be used within it. Data will flow via `@Input` and `@Output` bindings. Let's take a look at what we have in the UI library:-

**PostListComponent**: A ui component to display list of post cards.

**PostCardComponent**: A ui component to display a single post card.

**keyRendererPipe**: A pip to display a particular `key value` of post.

**Util**

The utility library contains all the utility/helper functions. It does not have access to any other libraries. However, all other libraries have access to it and can import code from it. Let's take a look at what we have in the util library:-

**GenericState**: We use a generic interface to represent the specific state in the store. Each state that makes an API call will have properties for `data`, `error`, and `loading`. This reusable interface provides a way to define the state. Please note that we are using a single property called `CallState` to represent the combined `error` and `loading` state.

**Post**: We use an interface to define the structure of each `Post`. We place it here because we need this interface in both the `ui` and `data-access` libraries. As we discussed earlier, the `ui` library cannot directly access the `data-access` library, so we include the interface here. Another option to handle this would be to create a duplicate interface called `PostUi` and place it in the `ui` library.

**Shared-Ui**

The shared ui library is a collection of reusable ui components, directives, pips etc. Let's explore what the test-util library has to offer:-

**ErrorStateComponent**: A ui component to display error if loading posts failed.

**SkeletonRectComponent**: A ui component to display skeleton loader while posts are loaded.

**Test-Util**

"The test-util library is a collection of mocks, stubs, and test utility functions. It is intended for use exclusively within `spec.ts` files. Let's explore what the test-util library has to offer:-

**test-util**: Utility functions that can be used in tests to remove the `boilerplate` or `duplicate` code.

**mocks**: List of mock posts that can be used in tests.

## Design Systems

Our design system is based on [Angular Material](https://material.angular.io/), which offers a comprehensive set of well-written components for Angular applications. However, `Angular Material` does not include `utility` classes necessary for preventing `duplicate styles`. To address this issue, we have incorporated [Bootstrap](https://getbootstrap.com/), which provides a plugin-based system. This allows us to selectively include the packages we need while excluding the rest from the bundle.

## Scss Architecture

We are `scss` to write custom styles. `Scss` provides us `mixins`, `variables`, `functions` etc to write reusable css.

On top of `scss`, we are using inverted triangle short named [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) pattern to write highly scalable and maintainable `css`. For more details, you can read the blog about ITCSS pattern. For our small app, we just have few of the layers. Based on the app size, we can have more layers. Our most of the custom styles will be written in the `component` layer.

**Note**: Once our `app` start growing, we can adopt [BEM](https://getbem.com/) methodology to go one step further.

## Unit Testcases

We are using jest as test runner and also as an assertion library. You need to run `npm test` command. It will run all your test cases and create HTML coverage report for you(via **_istanbul_**).
**Code coverage screenShots**
![alt text](./apps/postify/src/assets/code-coverage-data-access.png 'Data access coverage report')
![alt text](./apps/postify/src/assets/code-coverage-feature.png 'Feature coverage report')
![alt text](./apps/postify/src/assets/code-coverage-feature.png 'Feature coverage report')
![alt text](./apps/postify/src/assets/code-coverage-ui.png 'Ui coverage report')
![alt text](./apps/postify/src/assets/code-coverage-postify.png 'Postify App coverage report')
![alt text](./apps/postify/src/assets/code-coverage-shared-ui.png 'Shared ui coverage report')

# Features!

- **LoggerService** to log message to console in devmode only.
- **Global error handler** to handle the error at a single place(may be used to send notifications on channels such as slack etc).
- **Lazy loaded** modules to reduce the main bundle size.
- **nx monorepo** pattern to write scalable and maintainable code.
- Easily extendable **reusable components**(such as post card, skeleton loaders, error states, etc).
- **multilingual** support of the app via angular [i18n](https://angular.io/guide/i18n-overview)
- **10X10 grid** to render post cards
- **skeleton** based loaders.
- **Responsive** design.
- **Unit test** covered code to ensure quality.
- **State management** via ngrx store.
- **A11y** supportive app

## What can we do more?

However, this application has enough features to extend and reuse. But still, there are chances to make it better and more approachable.

> We can use **pagination** with api to render cards in the visible screen and load the other once user scrolls.

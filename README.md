# Student Information System (Sample App)
I've created this project to learn about Angular and its capabilities. You are free to use its source code to your liking.

Demo application is available [here](https://alenbec-angular-studentis.herokuapp.com).

This simple application contains student overview page which shows lists of students provided by faux api service. It supports adding students, deleting them and editing them (subjects only).

Web app implements OpenID Connect authentication. Use your Google account to log in. Authentication token will be stored in your browser's localStorage. You can use predefined OAuth2 Client ID or your own by changing `auth` parameters in `environment(.prod).ts`.  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.


## Current limitations/issues  
- Students and subjects are generated on site load and will persist as long as you don't close your browser or refresh site. If you revisit or refresh site, a new dataset of students and subjects will be generated. This is by design.
- Only some tests are written at the moment. More scenarios have yet to be covered.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

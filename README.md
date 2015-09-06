Object-oriented playground
====

This [demo application](zorec.github.io) demonstrates object-oriented features of JavaScript. User interface allows you to play with JSON objects (and OO concepts), here is a complete list of features:
- Generate random JSON objects of any count
- Add additional JSON objects
- Edit JSON objects’ properties and prototype chain
- See all accessible properties on each object
- See scope representation in different languages


Directory structure
---
Directory `src/lib` contains all application logic and files inside it contain descriptions of object-oriented concepts (just search for OO CONCEPT) used for implementation of demo application.
These files are intentionally separated from a user interface `scr/app`, which is an angular application so that even people without knowledge of this framework can understand them.
- `languages-prototypal.js`, `languages-functional.js`, `languages-pseudoclassical`: There exist 3 different version of languages module to compare inheritance patterns. From point of user interface (Angular application) they are all functionally equivalent.
- `objectHelper`: this module contain helper functions e.g. generating random objects, chaining an array of objects, ...
- `presentationCode`: this file contains the example code of encapsulation from the presenation. It is not connected to the rest of the demo application.

[Angular gulp generator](https://github.com/Swiip/generator-gulp-angular) was used to initialize application and uses its directory structure style. 


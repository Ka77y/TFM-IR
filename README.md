# Intro!

Este repositorio contiene un sistema Web de retroalimentación de similitud de un par de documentos.

- Las características con la que cuenta el sistema son:

	> * El sistema web permite seleccionar un documento y recupera los documentos que se consideran similares a este, con un orden previamente definido.
	> * Permite ordenar un par de documentos similares mediante dos criterios: niveles de relevancia y posicionamiento.
	> * Permite la conexión a una API y envía la información de la retroalimentación en formato JSON.

La API por defecto (disponible en: https://github.com/Ka77y/TFM/tree/master/Scripts/api), que está usando este proyecto colabora directamente con el modelo de generación de asociaciones de tópicos (disponible en: https://github.com/Ka77y/TFM)

Para poder proceder con la implementación de este sistema es necesario tener implementado el demo de librairy (disponible en: https://github.com/librairy/demo ) de manera local.

# TfmIr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

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

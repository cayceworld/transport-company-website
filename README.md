Task Runner – Transport Company Landing Page

A static landing website for a transport company, built with modern frontend tooling and a structured development workflow. The project is designed for rapid setup, development, and testing.

Features

Static site structure with HTML, SCSS, and JavaScript

Sass workflow with compilation and autoprefixing

Linting & validation for HTML, JS, and SCSS

Live development server with BrowserSync

JSON server for mock backend data

Automated build & watch tasks for fast iteration

Project Structure
src/
├─ index.html
├─ sass/        # SCSS files
├─ css/         # Compiled CSS
├─ js/          # JavaScript files
├─ images/      # Images & assets
├─ vendor/      # Third-party scripts or libraries
└─ db/          # Mock JSON data
dist/            # Build output

Setup

Install dependencies and initialize the project:

npm run init-project


This will create directories, initial files, .gitignore, and a mock JSON database.

Development

Start a live server with watch tasks:

npm run watch


Automatically compiles SCSS

Runs linting on JS and SCSS

Refreshes browser on changes

Build

Run a full build (includes tests and CSS autoprefixing):

npm run build


For development-only build:

npm run build-dev

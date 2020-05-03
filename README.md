# gatsby-theme-wirehead-tree

[![CircleCI](https://circleci.com/gh/wirehead/gatsby-theme-wirehead-tree.svg?style=shield)](https://circleci.com/gh/wirehead/gatsby-theme-wirehead-tree)[![npm version](https://badge.fury.io/js/gatsby-theme-wirehead-tree.svg)](https://www.npmjs.com/package/gatsby-theme-wirehead-tree)[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)[![Hippocratic License](https://img.shields.io/badge/license-Hippocratic%20OSL%202.1-4baaaa)](https://firstdonoharm.dev/)

I wanted to make Gatsby work the way I wanted it to work, which turns out to be a little non-trivial.

Specifically:

* I don't want to be too wedded to a "blog" idea where it's just an about section and a single blog.  Hierarchial trees are great.
* I want a `content` folder that contains a bunch of markdown or MDX files with frontmater
* I don't want to have to put slugs in the file names, I just want the file name to determine the path.
* I want to be able to generate queries for the structure of the site easily, including breadcrumbs.
* I want to have titles for each of the pages (specified as the `title` key in the frontmatter) and I want them to be respected in the navigational elements and breadcrumbs with.
* I want to be able to add dates with a `date` key in the frontmatter and be able to search on them.
* I want to be able to use a `type` key in the frontmatter to select the template because MDX has some weird stuff with it's native idea of templating and it doesn't really work the way I wanted it to.
* I also want to be able to make JSX pages that have front matter in them.  And I don't want it to be obvious how the pages.

**WORK IN PROGRESS WARNING**: I'm totally not finished messing with this.

## Release status

This is not, to my knowledge, running in production and probably not quite ready for that yet.

## Installation

Use the package manager [npm](https://https://www.npmjs.com/) to install.

```bash
npm i gatsby-theme-wirehead-tree
```

## Usage

**WORK IN PROGRESS WARNING**: I'm not ready with much docs yet.

See [gatsby-starter-wirehead-tree](https://github.com/wirehead/gatsby-starter-wirehead-tree) for an example.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Code of conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## License

[Hippocratic Open Source License 2.1](https://firstdonoharm.dev/) see LICENSE.md
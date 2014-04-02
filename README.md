# github-diff-filter

A Google Chrome extension to allow you to filter the list of files in GitHub's comparison views.

When viewing a commit or pull request with a large number of modified files or lines,
it might be helpful to have the ability to filter that list of files on the fly so that you can:
- review smaller chunks of it at one time
- ignore things that need no review or can't practically be reviewed (e.g., minified files)

This extension provides some features to help you do that.


## Screenshot

![Chrome Extension Screenshot](chrome-extension-screenshot.png)


## Installing the extension

1. Clone this repo and `cd` into its root.
2. `cp manifest-sample.json manifest.json` - Copies `manifest-sample.json` into `manifest.json`.
3. **If you want to use this with GitHub Enterprise:**  
   In `manifest.json`, under `matches`, replace `ghe.domain` with the domain of
   your GHE server.
4. Follow [these instructions](http://developer.chrome.com/extensions/getstarted#unpacked)
   for loading this repository as an unpacked extension.


## Contributing

### Requirements

- [npm](https://npmjs.org/)
- [bower](http://bower.io/#installing-bower)
- [grunt-cli](http://gruntjs.com/getting-started)
- That's it! NPM will help you install everything else you need.

### Workflow

1. Clone this repo and `cd` into its root
2. `npm install` - Initializes Grunt in this folder and installs dependencies.
3. `bower install` - Downloads third party libraries used in this extension.
4. `grunt bower` - Moves the files we need from `bower_components` to `vendor`.

Currently the extension targets comparison and pull request pages.
If GitHub updates the URL structure of these pages, or if another type of page
comes along which could take advantage of this extension, we'll need to update
the `matches` patterns in `manifest.json`.

More on tweaking the matching patterns can be found
[here](http://developer.chrome.com/extensions/content_scripts#match-patterns-globs).


## Release History

### v1.0.0 – April 2, 2014

First release! Allows you to collapse and/or mark-as-reviewed individual file diffs.
Tested on Google Chrome 31+.


## Roadmap

Some general, not-set-in-stone ideas for future features.

### v1.1 – Add pop-up filter panel

- Like the simple bookmarklet being developed on the
  [master branch](https://github.com/Scotchester/github-diff-filter/tree/master)
- Form has one text field and a submit button.
- On submit, the two commands described above in the **proof of concept** are run,
  using whatever is in the text field as the arguments to the
  `contains` function and `data-path` attribute selector.
  (I.e., replacing `.min` in the examples given.)
- Pop up stays open to allow for subsequent commands to be input; has close button to dismiss.

### v1.2

- Add button to unhide all previously-hidden files.
- Add ability to enter multiple comma-separated arguments into the text field.

### v1.3

- Add to a list of activated filters each time the form is submitted.
- Allow for selective deactivation of single filters.

### v1.4

- Add a second form: **Show only files matching this query**
  (e.g., show me only `.css` files)

_Some UX work needed to figure out how best to handle this.
Would it override hiding filters already set?
Is it actually a second bookmarklet?_

### v1.5

- Detect filetypes present and offer checkboxes to show/hide them.

### v1.6

- Insert checkboxes next to each file in the Diff Stats list for one-click hiding of that file.

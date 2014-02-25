# component-remove [![Build Status](https://travis-ci.org/kewah/component-remove.png?branch=master)](https://travis-ci.org/kewah/component-remove)

Remove files from component.json

## Install

```
npm install -g component-remove
```

## Usage

component-remove(1) removes the reference from the component.json and delete the file.
```
component remove index.js
```

It is possible to remove multiple files:
```
component remove index.js foo.css tpl.html
```

With the flag `-k` or `--keep-file` the reference is removed but the file is not deleted.

## Supported extensions

**scripts:**
- `.js`
- `.coffee`

**styles:**
- `.css`
- `.styl`
- `.sass`
- `.scss`

**templates:**
- `.html`
- `.jade`
- `.hbs`

You can make a PR to support more extension.

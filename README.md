# bootstrap-alert

[![npm version](https://img.shields.io/npm/v/bootstrap-alert.svg)](https://www.npmjs.com/package/bootstrap-alert)
[![Bootstrap](https://img.shields.io/badge/Framework-Bootstrap%205-7952b3)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![bundle size](https://img.shields.io/bundlephobia/minzip/bootstrap-alert)](https://bundlephobia.com/package/bootstrap-alert)

A lightweight [Bootstrap 5](https://getbootstrap.com/docs/5.3/) toast notification library that provides a modern alternative to `alert()`.

## Installation

To use locally, install via `npm`:

```bash
npm install bootstrap-alert
```

... and add this to your script:

```js
import { bootstrapAlert } from "./node_modules/bootstrap-alert/dist/bootstrap-alert.js";
```

To use via CDN, add this to your script:

```js
import { bootstrapAlert } from "https://cdn.jsdelivr.net/npm/bootstrap-alert@1";
```

## Usage

```js
import { bootstrapAlert } from "https://cdn.jsdelivr.net/npm/bootstrap-alert@1";

// Simple toast
bootstrapAlert("Simple message");

// Custom toast: with title and color
bootstrapAlert({ title: "Success", body: "Custom toast message", color: "success" });

// Replace toast: clears previous ones
bootstrapAlert({ body: "This replaces previous toast", replace: true });

// Bottom left position
bootstrapAlert({ title: "Position", body: "Bottom start", position: "bottom-0 start-0" });

// Top right position
bootstrapAlert({ title: "Position", body: "Bottom start", position: "top-0 end-0" });

// HTML toast: with icons / formatting
bootstrapAlert({ title: '<i class="bi bi-cake2"></i> Congts!', body: "Well <u>done</u>!" });

// Don't hide: Keep toast on screen until dismissed
bootstrapAlert({ body: "Stays on screen", autohide: false });

// Quick hide: Change the delay before timeout
bootstrapAlert({ body: "Vanishes quickly", delay: 500 });
```

[](bootstrap-alert.html ":include")

## API

`bootstrapAlert(options)` creates and displays a Bootstrap toast notification.

| Option      | Type    | Default       | Description                                                       |
| ----------- | ------- | ------------- | ----------------------------------------------------------------- |
| `body`      | string  | required      | Toast message text/HTML                                           |
| `title`     | string  |               | Toast header text/HTML                                            |
| `color`     | string  |               | Bootstrap color variant (primary, success, danger, warning, info) |
| `replace`   | boolean | false         | If true, replaces previous toasts; else, appends toast            |
| `position`  | string  | 'top-0 end-0' | Toast position `{top/start/bottom/end}-{0/50/100}`. Persists      |
| `delay`     | number  | 5000          | Delay in milliseconds before hiding the toast                     |
| `autohide`  | boolean | true          | Automatically hide the toast after the delay                      |
| `animation` | boolean | true          | Apply a CSS fade transition to the toast                          |

Throws:

- `Error` if Bootstrap 5 is not loaded
- `Error` if body parameter is not provided

## Development

```bash
git clone https://github.com/sanand0/bootstrap-alert.git
cd bootstrap-alert

npm install
npm run lint && npm run build && npm test

npm publish
git commit . -m"$COMMIT_MSG"; git tag $VERSION; git push --follow-tags
```

## Release notes

- [1.1.0](https://npmjs.com/package/bootstrap-alert/v/1.1.0): 30 Jun 2025. Standardized package.json & README.md
- [1.0.0](https://npmjs.com/package/bootstrap-alert/v/1.0.0): 25 Jun 2025. Initial release

## License

[MIT](LICENSE)

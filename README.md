# bstoast

A lightweight Bootstrap 5 toast notification library that provides a modern alternative to `alert()`.

## Installation

```bash
npm install bstoast
```

## Quick Start

```js
import { bstoast } from "https://cdn.jsdelivr.net/npm/bstoast";

// Simple usage
bstoast("Hello World!");

// Advanced usage with icon
bstoast({
  title: "Success",
  body: "Operation completed",
  color: "success",
  icon: "check-circle",
  timeout: 3000
});
```

## Live Demo

Try out bstoast with our [live demo](https://prudhvi1709.github.io/bstoast/) which includes interactive examples and code snippets.

## API Reference

### `bstoast(options)`
Creates and displays a Bootstrap toast notification.

#### Parameters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | "Alert" | Toast header text |
| `body` | string | required | Toast message content |
| `color` | string | "primary" | Bootstrap color variant (primary, success, danger, warning, info) |
| `append` | boolean | true | If true, adds new toast to existing ones. If false, clears previous toasts |
| `timeout` | number \| false | 5000 | Auto-hide delay in milliseconds. Set to false to disable auto-hide |
| `icon` | string | undefined | Bootstrap Icons class name (without 'bi-' prefix) |

#### Returns
- `void`

#### Throws
- `Error` if Bootstrap 5 is not loaded
- `Error` if body parameter is not provided

#### Example Usage

```js
// Simple string message
bstoast("Operation successful!");

// Full configuration with icon
bstoast({
  title: "Error",
  body: "Something went wrong",
  color: "danger",
  icon: "exclamation-triangle",
  append: true,
  timeout: 10000
});

// Disable auto-hide
bstoast({
  title: "Important",
  body: "Please read this carefully",
  timeout: false
});

// Using Bootstrap Icons
bstoast({
  title: "Info",
  body: "New update available",
  icon: "info-circle",
  color: "info"
});
```

## Requirements

- Bootstrap 5 JavaScript
- Bootstrap Icons (optional, for icon support)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

If you discover any security-related issues, please raise an issue in the issue tracker.

## Credits

- [Bootstrap](https://getbootstrap.com/) - For the toast component
- [Bootstrap Icons](https://icons.getbootstrap.com/) - For icon support

# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```sh
npm run dev
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing, which is a Vite-native test runner that works seamlessly with Remix and ESM modules.

### Running Tests

Run all tests:
```sh
npm test
```

Run tests in watch mode (for development):
```sh
npm run test:watch
```

Run tests with UI:
```sh
npm run test:ui
```

### Test Structure

- Tests are located in `app/**/__tests__/` directories
- Uses React Testing Library for component testing
- Uses `@remix-run/testing` for Remix-specific testing utilities
- API calls are mocked using Vitest's mocking API

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

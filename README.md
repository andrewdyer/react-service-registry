# React Service Registry

A package for managing services and dependencies in React applications.

## Getting Started

To install this package use npm:

```bash
npm install react-service-registry
```

## Basic Usage

### Defining Services

First, define the services that will be registered and used in the application:

```ts
// src/services/SomeService.ts
export interface SomeServiceInterface {
    fetchData: () => Promise<string>;
}

class SomeService implements SomeServiceInterface {
    fetchData() {
        return Promise.resolve('Data from SomeService');
    }
}

export default SomeService;
```

### Registering Services

Services are registered with the ServiceRegistry to ensure centralized access across the application:

```ts
// src/services/index.ts
import { ServiceRegistry } from 'react-service-registry';
import SomeService from './SomeService';

const serviceRegistry = new ServiceRegistry();

serviceRegistry.register('someService', () => new SomeService());

export default serviceRegistry;
```

### Wrapping the Application with the Service Provider

Wrap the root component with the ServiceProvider to make the service registry accessible throughout the application via context:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ServiceProvider } from 'react-service-registry';
import App from './App';
import serviceRegistry from './services';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ServiceProvider serviceRegistry={serviceRegistry}>
        <App />
    </ServiceProvider>
);
```

### Accessing Services with useService

Use the useService hook to access registered services in functional components:

```tsx
// src/components/SomeComponent.tsx
import React from 'react';
import { useService } from 'react-service-registry';
import { SomeServiceInterface } from '../services/SomeService';

export interface SomeComponentProps {}

const SomeComponent: React.FC<SomeComponentProps> = () => {
    const someService = useService<SomeServiceInterface>('someService');

    React.useEffect(() => {
        someService.fetchData().then(data => {
            console.log(data);
        });
    }, [someService]);

    return <div>Check the console for data!</div>;
};

export default SomeComponent;
```

## Advanced Usage

### Defining a Service Type Map

To avoid specifying types for services every time, create a service type map that associates service names with their respective types:

```ts
// src/types/ServiceTypes.ts
import { SomeServiceInterface } from '../services/SomeService';

export interface ServiceTypeMap {
    someService: SomeServiceInterface;
}
```

### Creating a Typed useService Hook

Create a typed version of the useService hook that automatically infers the service type based on the service name:

```ts
// src/hooks/useTypedService.ts
import { useService } from 'react-service-registry';
import { ServiceTypeMap } from '../types/ServiceTypes';

const useTypedService = <K extends keyof ServiceTypeMap>(name: K): ServiceTypeMap[K] => {
    return useService<ServiceTypeMap[K]>(name);
};

export default useTypedService;
```

### Accessing Services with the Typed Hook

The typed useService hook makes it easier to retrieve services without manually specifying their types:

```tsx
// src/components/AnotherComponent.tsx
import React from 'react';
import useTypedService from '../hooks/useTypedService';

export interface AnotherComponentProps {}

const AnotherComponent: React.FC<AnotherComponentProps> = () => {
    const someService = useTypedService('someService');

    React.useEffect(() => {
        someService.fetchData().then(data => console.log(data));
    }, [someService]);

    return <div>Check the console for data!</div>;
};

export default AnotherComponent;
```

## Local Development

For local development, use Yalc to install this package in your project.

Yalc is a tool for managing local development of npm packages. It allows you to work on this package locally and test it in other projects without publishing to the npm registry.

To use yalc, you need to install it globally on your machine. You can do this using npm:

```bash
npm install yalc -g
```

### Installing the Package with Yalc

First, navigate to the project directory where you want to use this package and run:

```bash
yalc add react-service-registry
```

This will install the package from the local Yalc store. You can now use it in the project as you would with any other npm package.

### Updating the Package with Yalc

After publishing changes to this package to the local Yalc store, navigate to the project directory and run:

```bash
yalc update react-service-registry
```

This will update the installed version of this package in the project.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds production files in your `dist/` folder. It generates CommonJS, ES Modules, as well as TypeScript declaration files.

### `npm run build:cjs`

Builds CommonJS (CJS) modules for the project.

### `npm run build:esm`

Builds ES Modules (ESM) for the project.

### `npm run build:types`

Generates TypeScript declaration files.

### `npm run clean`

Removes the `dist/` folder to ensure a clean build.

### `npm run format`

Formats the code using Prettier according to the rules defined in package.json.

### `npm run test`

Runs the test suite for the project using Jest.

### `npm run test:watch`

Runs the test suite in watch mode, re-running tests when files change.

### `npm run test:coverage`

Runs the test suite and generates a coverage report.

### `npm run yalc:publish`

Publishes the package to the local Yalc store for local development.

### `npm run yalc:push`

Publishes updates to the package in the local Yalc store and pushes the changes to linked projects.

## Publishing

This repository is configured to publish the package to npm, every time you publish a new release, using GitHub Actions.

### Creating and Using an npm Token

To publish the package, you need an npm token:

1. Log in to your npm account.
2. Navigate to Access Tokens in your npm account settings.
3. Generate a new token with the Automation option, especially if you have 2FA enabled.
4. Add the token to your GitHub repository secrets:
    - Go to Settings > Secrets and variables > Actions.
    - Add a new secret named `NPM_TOKEN` and paste your npm token.

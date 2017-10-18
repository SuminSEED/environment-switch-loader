# Environment Switch Loader

Replace the file to be exported.

## Install

```bash
npm install --save-dev environment-switch-loader
```

## Usage

```js
{
    test: /\.js$/,
    use: [
        {
            loader: 'environment-switch-loader',
            options: {
                env: process.env.NODE_ENV,
                environmentSource: './src/environments/environment.js',
                environments: {
                    'prodction': './src/environments/environment.prod.js'
                }
            }
        }
    ]
}

{
    test: /\.js$/,
    use: [
        {
            loader: 'environment-switch-loader',
            options: {
                env: process.env.NODE_ENV,
                environmentSource: './src/environments/environment.js',
                environments: function(env, environmentSource, resourcePath) {
                    return `./src/environments/environment.${env}.js`;
                }
            }
        }
    ]
}

var environment = require('environments/environment');
```

### Be careful when using ts-loader.

In order to prevent ts-loader from rebuilding dependencies, the transpileOnly flag needs to be set to true.

This invalidates type checking by ts-loader.

But you guys are supplemented by editor, right?

```js
{
    test: /\.ts$/,
    use: [
        {
            loader: "ts-loader",
            options: {
                transpileOnly: true
            }
        },
        {
            loader: 'environment-switch-loader',
            options: {
                env: process.env.NODE_ENV,
                environmentSource: './src/environments/environment.ts',
                environments: {
                    'prodction': './src/environments/environment.prod.ts'
                }
            }
        }
    ]
}

{
    test: /\.ts$/,
    use: [
        {
            loader: "ts-loader",
            options: {
                transpileOnly: true
            }
        },
        {
            loader: 'environment-switch-loader',
            options: {
                env: process.env.NODE_ENV,
                environmentSource: './src/environments/environment.ts',
                environments: function(env, environmentSource, resourcePath) {
                    return `./src/environments/environment.${env}.ts`;
                }
            }
        }
    ]
}

import { environment } from 'environments/environment';
```

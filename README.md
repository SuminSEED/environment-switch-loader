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

var environment = require('environments/environment.js');
```

### Be careful when using ts-loader.

In order to prevent ts-loader from rebuilding dependencies, the transpileOnly flag needs to be set to true.

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

import { environment } from 'environments/environment';
```

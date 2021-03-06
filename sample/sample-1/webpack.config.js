const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;    
                                   
module.exports = {                 
    entry: path.join(__dirname, "index.ts"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["env", { modules: false }]
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    },
                    {
                        loader: "environment-switch-loader",
                        options: {
                            env: "prod",
                            environmentSource: path.join(__dirname, "environment.ts"),
                            environments: function(env, environmentSource, resourcePath) {
                                return path.join(__dirname, "./environment.prod.ts");
                            }
                            // environments: {
                            //     "prod": path.join(__dirname, "environment.prod.ts")
                            // }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    resolve: {
        extensions: [".ts"]
    },
    resolveLoader: {
        alias: {
            "environment-switch-loader": path.join(__dirname, "../../dist/index.js")
        }
    }
};

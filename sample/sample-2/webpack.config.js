const path = require("path");

module.exports = {
    entry: path.join(__dirname, "index.js"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
                        loader: "environment-switch-loader",
                        options: {
                            env: "prod",
                            environmentSource: path.join(__dirname, "environment.js"),
                            environments: {
                                "prod": path.join(__dirname, "environment.prod.js")
                            }
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    resolveLoader: {
        alias: {
            "environment-switch-loader": path.join(__dirname, "../../dist/index.js")
        }
    }
};

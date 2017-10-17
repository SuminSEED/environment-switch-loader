import * as loaderUtils from "loader-utils";
import * as fs from "fs";
import { matchSource, getEnvironment } from "./utils";

module.exports = function(source: string) {
    let query = loaderUtils.getOptions(this) || {};
    let env = query.env || "";
    let environments = query.environments || {};
    let environmentSource = query.environmentSource || "";
    let resourcePath = this.resourcePath;
    let environment = getEnvironment(env, environmentSource, environments);
    if (!environment || !matchSource(environmentSource, resourcePath)) return source;
    let callback = this.async();
    fs.readFile(environment, (err, new_source) => {
        if (err) callback(null, source);
        else {
            this.addDependency(environment);
            callback(null, new_source);
        }
    });
};

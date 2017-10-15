import * as loaderUtils from "loader-utils";
import * as fs from "fs";
import * as path from "path";

module.exports = function(source: string) {
    let query = loaderUtils.getOptions(this) || {};
    let env = query.env || "";
    let environments = query.environments || {};
    let environmentSource = query.environmentSource || "";
    let resourcePath = this.resourcePath;
    let environment = environments[env];
    if (!environment) return source;
    environmentSource = path.resolve(environmentSource);
    environment = path.resolve(environment);
    let callback = this.async();
    if (environmentSource === resourcePath) {
        this.addDependency(environment);
        fs.readFile(environment, function(err, header) {
            callback(null, header);
        });
    } else {
        callback(null, source);
    }
};

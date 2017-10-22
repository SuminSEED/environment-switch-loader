import * as webpack from "webpack";
import * as loaderUtils from "loader-utils";
import * as fs from "fs";
import { matchSource, getEnvironment } from "./utils";

module.exports.pitch = function(remainingRequest: string, precedingRequest: string, data: any) {
    let query = loaderUtils.getOptions(this) || {};
    let env = query.env || "";
    let environments = query.environments || {};
    let environmentSource = query.environmentSource || "";
    let resourcePath = this.resourcePath;
    let environment = getEnvironment(env, environmentSource, environments, resourcePath);
    if (environment && fs.existsSync(environment) && matchSource(environmentSource, resourcePath)) {
        const source = fs.readFileSync(environment).toString();
        this.addDependency(environment);
        return source;
    }
};

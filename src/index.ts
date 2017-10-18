import * as loaderUtils from "loader-utils";
import * as fs from "fs";
import { matchSource, getEnvironment } from "./utils";

// module.exports = function(source: string) {
//     let query = loaderUtils.getOptions(this) || {};
//     let env = query.env || "";
//     let environments = query.environments || {};
//     let environmentSource = query.environmentSource || "";
//     let resourcePath = this.resourcePath;
//     let environment = getEnvironment(env, environmentSource, environments, resourcePath);
//     if (!environment || !matchSource(environmentSource, resourcePath)) return source;
//     let callback = this.async();
//     fs.readFile(environment, (err, new_source) => {
//         if (err) callback(null, source);
//         else {
//             this.addDependency(environment);
//             callback(null, new_source);
//         }
//     });
// };
// module.exports = function(source: string) {
//     if (this.data.environment) {
//         console.log("I am loader");
//         let callback = this.async();
//         let environment = this.data.environment;
//         fs.readFile(environment, (err, new_source) => {
//             if (err) callback(null, source);
//             else {
//                 this.addDependency(environment);
//                 callback(null, new_source);
//             }
//         });
//     } else {
//         return source;
//     }
// };
module.exports.pitch = function(remainingRequest: string, precedingRequest: string, data: any) {
    let query = loaderUtils.getOptions(this) || {};
    let env = query.env || "";
    let environments = query.environments || {};
    let environmentSource = query.environmentSource || "";
    let resourcePath = this.resourcePath;
    let environment = getEnvironment(env, environmentSource, environments, resourcePath);
    if (environment && matchSource(environmentSource, resourcePath)) {
        let callback = this.async();
        fs.readFile(environment, (err, new_source) => {
            if (!err) {
                this.addDependency(environment);
                callback(null, new_source);
            }
        });
    }
};

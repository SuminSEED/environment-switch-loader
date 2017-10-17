import * as path from "path";

export function matchSource(
    environmentSource: string | RegExp,
    resourcePath: string
) {
    resourcePath = path.resolve(resourcePath);
    if (typeof environmentSource === "string") {
        environmentSource = path.resolve(environmentSource);
        return environmentSource === resourcePath;
    }
    return environmentSource.test(resourcePath);
}

export function getEnvironment(
    env: string,
    environmentSource: string | RegExp,
    environments: { [className: string]: string } | ((env: string, environmentSource: string | RegExp, resourcePath: string) => string),
    resourcePath: string
) {
    if (typeof environments === "function") {
        return path.resolve(environments(env, environmentSource, resourcePath));
    }
    return path.resolve(environments[env]);
}

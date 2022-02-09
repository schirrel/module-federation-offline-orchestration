const nameRegex = new RegExp(/^.\//gm)
const componentName = (name: string) : string => nameRegex.test(name) && name || `./${name}`

/**
Thanks to @wmain and @ScriptedAlchemy
* Adapted from https://github.com/module-federation/module-federation-examples/blob/master/advanced-api/dynamic-remotes/app1/src/App.js and https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/
**/
function loadComponent(scope, module) {
  return async () => {
    await __webpack_init_sharing__('default');
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope]?.get(componentName(module));
    const Module = factory();
    return Module;
  };
}

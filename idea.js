

const addScript = async (src) => {
    return new Promise((resolve) => {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        s.onload = function () {
            resolve()
        };
        document.body.appendChild(s);
    })
}

const getAllRemotesURL = async () => {
    // Get all remotes URL, get it from module federation extend plugin https://github.com/schirrel/extended-module-federation-plugin or otherwise
    const remoteEnvs = Object.keys(process.env).filter(name => name.toUpperCase().indexOf("REMOTE_") != -1)
    await Promise.all(remoteEnvs.map(name => addScript(process.env[name])))
}

const loadComponent = function (scope, module) {
    return async () => {
        await __webpack_init_sharing__('default');
        const container = window[scope]; // or get the container somewhere else
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(`./${module}`);
        const Module = factory();
        return Module;
    };
}
export const initOffline = async () => {
    await getAllRemotesURL()
    const remoteNames = // get it from mfe plugin
    remoteNames.forEach(remoteName => {
        const components = [] // get it from mfe plugin
        components.forEach(async component => {
            loadComponent(remoteName, component)()
        })
    })

}

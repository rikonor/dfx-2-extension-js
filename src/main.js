import { print } from "my-namespace:my-package/host";

const CLI_SPEC = JSON.stringify({
    name: "ext-js",
    help: "Example JavaScript extension",
    args: [],
    subcommands: [],
});

export const lib = {
    myFn: (s) => `guest: ${s}`,
}

export const cli = {
    spec: () => CLI_SPEC,
    run: (args) => {
        print("hello from JavaScript extension");
        return 0;
    },
}

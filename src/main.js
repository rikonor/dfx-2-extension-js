import { print } from "my-namespace:my-package/host";

const CLI_SPEC = JSON.stringify({
    name: "ext-2",
    help: "The most amazing extension you've ever seen",
    args: [],
    subcommands: [],
});

export const lib = {
    myFn: (s) => `guest: ${s}`,
}

export const cli = {
    spec: () => CLI_SPEC,
    run: (args) => {
        print("butts");
        return 0;
    },
}

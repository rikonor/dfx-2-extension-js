import { CommandSpec } from './command-spec';

import { print } from "my-namespace:my-package/host";

const jsonSpec = {
  name: "devtool",
  help: "Developer toolkit for various tasks",
  version: "1.0.0",
  args: [
    {
      name: "verbose",
      help: "Enable verbose output",
      short: "v",
      long: "verbose"
    }
  ],
  subcommands: [
    {
      name: "server",
      help: "Server management commands",
      subcommands: [
        {
          name: "start",
          help: "Start the server",
          args: [
            {
              name: "port",
              help: "Port to listen on",
              short: "p",
              long: "port"
            }
          ]
        },
        {
          name: "stop",
          help: "Stop the server"
        },
        {
          name: "config",
          help: "Server configuration management",
          subcommands: [
            {
              name: "show",
              help: "Show current configuration"
            },
            {
              name: "set",
              help: "Set configuration values",
              args: [
                {
                  name: "key",
                  help: "Configuration key"
                },
                {
                  name: "value",
                  help: "Configuration value"
                }
              ],
              subcommands: [
                {
                  name: "production",
                  help: "Set production configurations"
                },
                {
                  name: "development",
                  help: "Set development configurations"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Parse JSON spec into a CommandSpec
const commandSpec = CommandSpec.fromJSON(jsonSpec);

// Convert to Commander program
const program = commandSpec.toCommander();

// Example of how to add action handlers to all levels of commands
function attachActions(command, path = []) {
  const currentPath = [...path, command.name()];

  // Add action for this command
  command.action((options, cmd) => {
    console.log(`Executed command: ${currentPath.join(' ')}`);
    console.log('Options:', options);
  });

  // Process all subcommands recursively
  if (command.commands && command.commands.length > 0) {
    command.commands.forEach(subcmd => {
      attachActions(subcmd, currentPath);
    });
  }
}

// Attach action handlers to all commands
attachActions(program);

export const lib = {
  myFn: (s) => `guest: ${s}`,
}

export const cli = {
  spec: () => JSON.stringify(jsonSpec),
  run: (args) => {
    print("hello from JavaScript extension");

    // Parse command line arguments
    program.parse(args);
  },
}

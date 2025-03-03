const { Command, Option } = require('commander');

/**
 * Represents an argument specification that can be converted to a Commander option
 */
class ArgSpec {
  constructor(data) {
    this.name = data.name;
    this.help = data.help;
    this.short = data.short;
    this.long = data.long;
  }

  toCommanderOption() {
    // If we have short or long, it's an option flag
    if (this.short || this.long) {
      let flags = '';

      if (this.short) {
        flags += `-${this.short}`;
        if (this.long) flags += ', ';
      }

      if (this.long) {
        flags += `--${this.long}`;
      }

      // Add variable placeholder for the value
      flags += ` <value>`;

      return {
        type: 'option',
        option: new Option(flags, this.help || '')
      };
    }
    // Otherwise it's a positional argument
    else {
      return {
        type: 'argument',
        name: this.name,
        description: this.help || ''
      };
    }
  }
}

/**
 * Represents a command specification that can be converted to a Commander command
 */
class CommandSpec {
  constructor(data) {
    this.name = data.name;
    this.help = data.help;
    this.version = data.version;
    this.args = (data.args || []).map(arg => new ArgSpec(arg));
    this.subcommands = (data.subcommands || []).map(cmd => new CommandSpec(cmd));
  }

  toCommander() {
    const cmd = new Command(this.name);

    if (this.help) {
      cmd.description(this.help);
    }

    if (this.version) {
      cmd.version(this.version);
    }

    // Add arguments and options
    for (const arg of this.args) {
      const result = arg.toCommanderOption();
      if (result.type === 'option') {
        cmd.addOption(result.option);
      } else {
        cmd.argument(`<${result.name}>`, result.description);
      }
    }

    // Add subcommands
    for (const subcmd of this.subcommands) {
      cmd.addCommand(subcmd.toCommander());
    }

    return cmd;
  }

  /**
   * Create a CommandSpec from a JSON string or object
   */
  static fromJSON(json) {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    return new CommandSpec(data);
  }
}

module.exports = { CommandSpec, ArgSpec };
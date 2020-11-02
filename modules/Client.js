const GuildManager = require("./GuildManager");
const CommandConstruct = require("./CommandConstruct");
const EventConstruct = require("./EventConstruct");
const Handler = require("./Handler");
const PipeMain = require("./PipeMain");
const log = require("./log");
const { Client: DiscordClient, Collection, version } = require("discord.js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fse = require("fs-extra");
const path = require("path");
const { config } = require("./defaultData");
const sandplate = require("../sandplate.json");

/**
 * Extension of the discord.js client
 * @extends {DiscordClient}
 */
class Client extends DiscordClient {
  /**
   * @param {ClientOptions} options - Options for the client
   */
  constructor(options) {
    super(options);

    /**
     * Replace this.guilds with our extended GuildManager
     */
    this.guilds = new GuildManager(this);

    /**
     * Full file path used for the configuration file
     * @type {string}
     * @readonly
     */
    this.dbPath = path.join(__dirname, "../data/config.json");

    // Log to the console if the config will be created
    if (!fse.pathExistsSync(this.dbPath)) log.info(`A default config file will be generated at ./data/config.json`);

    /**
     * Config database via lowdb
     */
    this.config = low(new FileSync(this.dbPath));
    this.config.defaultsDeep(config).write();

    /**
     * Arbitrary Collection
     * @type {Collection<*, *>}
     */
    this.cookies = new Collection();

    /**
     * Handler framework
     * @type {Handler}
     */
    this.handler = new Handler("mainModules");

    /**
     * Commands
     * @type {CommandConstruct}
     */
    this.commands = new CommandConstruct(this, "bot command construct");

    /**
     * Events
     * @type {EventConstruct}
     */
    this.events = new EventConstruct(this, "discord.js event construct");

    /**
     * Pipe
     * @type {PipeMain}
     */
    this.pipe = new PipeMain("./app/mainListeners/", this);

    /**
     * Version numbers
     */
    this.versions = {
      node: process.version.slice(1),
      electron: process.versions["electron"],
      chrome: process.versions["chrome"],
      discordjs: version,
      sandplate: sandplate.version,
    };
  }
}

module.exports = Client;

/**
 * Emitted whenever a blocked guild is detected by the client and left
 * @event Client#blockedGuild
 * @param {Discord.Guild} guild The guild that was left
 */

/**
 * Emitted whenever an unknown guild is detected by the client and left
 * @event Client#unknownGuild
 * @param {Discord.Guild} guild The guild that was left
 */

const GuildManager = require("./GuildManager");
const CommandConstruct = require("./CommandConstruct");
const EventConstruct = require("./EventConstruct");
const log = require("./log");
const { Client: DiscordClient, Collection } = require("discord.js");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const fse = require("fs-extra");
const path = require("path");
const { config } = require("./defaultData");

/**
 * Extension of the discord.js client
 * @extends {Client}
 */
class Client extends DiscordClient {
  /**
   * @param {MainPipe} pipe - The main process's instantiated pipe class
   * @param {ClientOptions} options - Options for the client
   */
  constructor(pipe, options) {
    super(options);

    /**
     * Whether or not this client has been initialized
     * @type {boolean}
     */
    this.initialized = false;

    /**
     * Whether or not this client is logged into the discord api
     * @type {boolean}
     */
    this.online = false;

    /**
     * Replace this.guilds with our extended GuildManager
     */
    this.guilds = new GuildManager(this);

    /**
     * Reference to the pipe this Client is for
     * @name Client#pipe
     * @type {MainPipe}
     * @readonly
     */
    Object.defineProperty(this, "pipe", { value: pipe });

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
     * Commands
     * @type {CommandConstruct}
     */
    this.commands = new CommandConstruct(this, "bot command construct");

    /**
     * Events
     * @type {EventConstruct}
     */
    this.events = new EventConstruct(this, "discord.js event construct");
  }

  async initialize() {
    const discordCommands = await this.pipe.handler.requireDirectory(this.commands, this.config.get("commands.directory").value(), true);
    log.info(discordCommands.message);
    const discordEvents = await this.pipe.handler.requireDirectory(this.events, this.config.get("events.directory").value(), true);
    log.info(discordEvents.message);
    this.initialized = true;
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

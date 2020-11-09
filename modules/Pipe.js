const BaseEventEmitter = require("./BaseEventEmitter");
const EventConstruct = require("./EventConstruct");
const IpcConstruct = require("./IpcConstruct");
const Handler = require("./Handler");
const log = require("./log");
const { version: DiscordVersion } = require("discord.js");
const sandplate = require("../sandplate.json");

/**
 * @extends {Base}
 */
class Pipe extends BaseEventEmitter {
  /**
   * @param {string} channelListeners
   * @param {string} eventListeners
   * @param {string} modulesName
   * @param {boolean} main
   * @param {IpcMain|IpcRenderer} ipc
   */
  constructor(channelListeners, eventListeners, modulesName, main, ipc) {
    super();

    /**
     * Whether or not this pipe has been initialized
     * @type {boolean}
     */
    this.initialized = false;

    /**
     * Version numbers
     */
    this.versions = {
      node: process.version.slice(1),
      electron: process.versions["electron"],
      chrome: process.versions["chrome"],
      discordjs: DiscordVersion,
      sandplate: sandplate.version,
    };

    /**
     * Path to the folder containing ipc channel listeners
     */
    this.channelListeners = channelListeners;

    /**
     * Path to the folder containing event listeners
     */
    this.eventListeners = eventListeners;

    /**
     * Whether this is being instantiated for the main process
     * @type {boolean}
     */
    this.main = main;

    /**
     * Channels
     * @type {IpcConstruct}
     */
    this.channels = new IpcConstruct(ipc, this, `${this.main ? "main" : "renderer"} pipe ipc construct`);

    /**
     * Events
     * @type {EventConstruct}
     */
    this.events = new EventConstruct(this, `${this.main ? "main" : "renderer"} pipe event construct`);

    /**
     * Handler framework
     * @type {Handler}
     */
    this.handler = new Handler(modulesName);
  }

  async initialize() {
    const channelListeners = await this.handler.requireDirectory(this.channels, this.channelListeners, true);
    log.info(channelListeners.message);
    const eventListeners = await this.handler.requireDirectory(this.events, this.eventListeners, true);
    log.info(eventListeners.message);
    this.initialized = true;
    log.info(`${this.main ? "Main pipe" : "A renderer pipe"} has been initialized`);
  }
}

module.exports = Pipe;

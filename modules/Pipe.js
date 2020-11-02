const Base = require("./Base");
// const EventConstruct = require("./EventConstruct");
const IpcConstruct = require("./IpcConstruct");
const log = require("./log");

/**
 * @extends {Base}
 */
class Pipe extends Base {
  constructor(listeners, end = "unknown", handler, ipc) {
    super();

    /**
     * Path to the folder containing shared listeners
     */
    this.listeners = listeners;

    /**
     * Which end of the type is being instantiated
     */
    this.end = end;

    /**
     * Reference to the handler
     * @name Pipe#handler
     * @type {Handler}
     * @readonly
     */
    Object.defineProperty(this, "handler", { value: handler });

    /**
     * Channels
     * @type {IpcConstruct}
     */
    this.channels = new IpcConstruct(ipc, this, `${this.end} pipe ipc construct`);

    // /**
    //  * Events
    //  * @type {EventConstruct}
    //  */
    // this.events = new EventConstruct(this, `${this.end} pipe event construct`);

    /**
     * Whether or not this pipe has been initialized
     * @type {Boolean}
     */
    this.initialized = false;
  }

  /**
   * @param {Handler} handler
   */
  async initiate(handler) {
    log.info(`${this.end} pipe is initializing using the ${handler.fileName} handler`);
    const ipcListeners = await this.handler.requireDirectory(this.channels, this.listeners, true);
    log.info(ipcListeners.message);
    this.initialized = true;
  }
}

module.exports = Pipe;

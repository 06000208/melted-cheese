const Base = require("./Base");
// const EventConstruct = require("./EventConstruct");
const IpcConstruct = require("./IpcConstruct");
const log = require("./log");

/**
 * @extends {Base}
 */
class Pipe extends Base {
  /**
   * @param {string} listeners
   * @param {boolean} main
   * @param {Handler} handler
   * @param {IpcMain|IpcRenderer} ipc
   */
  constructor(listeners, main, handler, ipc) {
    super();

    /**
     * Path to the folder containing shared listeners
     */
    this.listeners = listeners;

    /**
     * Whether this is being instantiated for the main process
     * @type {boolean}
     */
    this.main = main;

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
    this.channels = new IpcConstruct(ipc, this, `${this.main ? "main" : "render"} pipe ipc construct`);

    // /**
    //  * Events
    //  * @type {EventConstruct}
    //  */
    // this.events = new EventConstruct(this, `${this.main ? "main" : "render"} pipe event construct`);

    /**
     * Whether or not this pipe has been initialized
     * @type {boolean}
     */
    this.initialized = false;
  }

  /**
   * @param {Handler} handler
   */
  async initiate(handler) {
    log.info(`${this.main ? "main" : "render"} pipe is initializing using the ${handler.fileName} handler`);
    const ipcListeners = await this.handler.requireDirectory(this.channels, this.listeners, true);
    log.info(ipcListeners.message);
    this.initialized = true;
  }
}

module.exports = Pipe;

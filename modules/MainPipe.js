const Pipe = require("./Pipe");
const Client = require("./Client");
const { ipcMain } = require("electron");

/**
 * @extends {Pipe}
 */
class MainPipe extends Pipe {
  /**
   * @param {string} channelListeners
   * @param {string} eventListeners
   * @param {string} modulesName
   * @param {ClientOptions} options - Options for the client
   */
  constructor(channelListeners, eventListeners, modulesName, options) {
    super(channelListeners, eventListeners, modulesName, true, ipcMain);

    /**
     * @type {Client}
     */
    this.client = new Client(this, options);
  }
}

module.exports = MainPipe;

const Pipe = require("./Pipe");
const { ipcMain } = require("electron");

/**
 * @extends {Pipe}
 */
class PipeMain extends Pipe {
  /**
   * @param {string} listeners
   * @param {Client} client
   */
  constructor(listeners, client) {
    super(listeners, true, client.handler, ipcMain);

    /**
     * Reference to the client
     * @name PipeMain#client
     * @type {Client}
     * @readonly
     */
    Object.defineProperty(this, "client", { value: client });
  }
}

module.exports = PipeMain;

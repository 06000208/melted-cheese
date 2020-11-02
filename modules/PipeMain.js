const Pipe = require("./Pipe");
const { ipcMain } = require("electron");

/**
 * @extends {Pipe}
 */
class PipeMain extends Pipe {
  constructor(listeners, end, client) {
    super(listeners, end, client.handler, ipcMain);

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

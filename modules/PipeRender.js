const Pipe = require("./Pipe");
const Handler = require("./Handler");
const { ipcRenderer } = require("electron");

/**
 * @extends {Pipe}
 */
class PipeRender extends Pipe {
  /**
   * @param {string} listeners
   * @param {Window} window
   */
  constructor(listeners, window) {
    super(listeners, false, new Handler("renderModules"), ipcRenderer);

    /**
     * Reference to the window
     * @name PipeRender#window
     * @type {Window}
     * @readonly
     */
    Object.defineProperty(this, "window", { value: window });
  }
}

module.exports = PipeRender;

const Pipe = require("./Pipe");
const { ipcRenderer } = require("electron");

/**
 * @extends {Pipe}
 */
class RendererPipe extends Pipe {
  /**
   * @param {string} channelListeners
   * @param {string} eventListeners
   * @param {string} modulesName
   * @param {Window} window
   */
  constructor(channelListeners, eventListeners, modulesName, window) {
    super(channelListeners, eventListeners, modulesName, false, ipcRenderer);

    /**
     * Reference to the window
     * @name RendererPipe#window
     * @type {Window}
     * @readonly
     */
    Object.defineProperty(this, "window", { value: window });
  }
}

module.exports = RendererPipe;

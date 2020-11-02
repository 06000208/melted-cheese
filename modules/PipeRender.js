const Pipe = require("./Pipe");
const Handler = require("./Handler");
const { ipcRenderer } = require("electron");

/**
 * @extends {Pipe}
 */
class PipeRender extends Pipe {
  constructor(listeners, end, window) {
    super(listeners, end, new Handler("renderModules"), ipcRenderer);

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

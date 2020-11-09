const log = require("../modules/log");
const RendererPipe = require("../modules/RendererPipe");

log.debug("render");

window.pipe = new RendererPipe("./app/ipcRenderer", "./app/rendererListeners/", "renderModules", window);
window.pipe.initialize();

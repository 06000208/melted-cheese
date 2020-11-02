const log = require("../modules/log");
log.debug("render");

const PipeRender = require("../modules/PipeRender");
window.pipe = new PipeRender("./app/renderListeners/", "render", window);
window.pipe.initiate(window.pipe.handler);

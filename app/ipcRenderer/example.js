const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");

module.exports = new IpcBlock({
  channel: "example",
  once: false,
}, function(pipe, event) {
  log.info("The example ipc channel was emitted in a renderer process");
});

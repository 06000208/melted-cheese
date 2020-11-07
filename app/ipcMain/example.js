const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");

module.exports = new IpcBlock({
  channel: "example",
  once: false,
  invocable: false,
}, function(client) {
  log.info("The example ipc channel was emitted in the main process");
});

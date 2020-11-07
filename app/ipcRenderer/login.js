const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");

module.exports = new IpcBlock({
  channel: "login",
  once: false,
}, function(client) {
  log.info("The login ipc channel was emitted in a renderer process");
});

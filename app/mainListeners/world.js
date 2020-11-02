const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");

module.exports = new IpcBlock({
  channel: "world",
  once: false,
  invocable: false,
}, function(pipe, event) {
  log.info("world...! This is a test for the main process.");
});

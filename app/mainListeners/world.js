const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");

module.exports = new IpcBlock({
  channel: "world",
  once: true,
}, async function(pipe) {
  log.info("world...! This is a test for the main process.");
});

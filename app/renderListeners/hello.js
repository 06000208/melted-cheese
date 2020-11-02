const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const { ipcRenderer } = require("electron");

module.exports = new IpcBlock({
  channel: "hello",
  once: false,
}, function(pipe, event) {
  log.info("This is a test for a render process. You clicked the login button! Hello...");
  ipcRenderer.send("world");
});

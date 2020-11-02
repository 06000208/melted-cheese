const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const { ipcRenderer } = require("electron");

module.exports = new IpcBlock({
  channel: "hello",
  once: true,
}, async function(pipe) {
  log.info("This is a test for a render process. You clicked the login button! Hello...");
  ipcRenderer.send("world");
});

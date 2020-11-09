const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const { ipcRenderer } = require("electron");

module.exports = new IpcBlock({
  channel: "logout",
  once: false,
}, async function(pipe, event) {
  const input = confirm("Log out?");
  if (!input) return log.debug("User cancelled log out");
  const logout = await ipcRenderer.invoke("logout", input);
  log.debug(logout);
});

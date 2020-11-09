const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const menu = require("../menu");

module.exports = new IpcBlock({
  channel: "login",
  once: false,
  invocable: true,
}, async function(pipe, event, token) {
  log.info("The login ipc channel was emitted in the main process");
  if (!token) return false;
  try {
    await pipe.client.login(token);
  } catch (error) {
    log.error("Something went wrong while attempting to login", error);
    return false;
  }
  pipe.client.online = true;
  menu(pipe, pipe.win);
  return true;
});

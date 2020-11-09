const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const Client = require("../../modules/Client");
const menu = require("../menu");

module.exports = new IpcBlock({
  channel: "logout",
  once: false,
  invocable: true,
}, async function(pipe, event, ...args) {
  log.info("The logout ipc channel was emitted in the main process");
  pipe.client.cookies.clear();
  await pipe.client.destroy();
  pipe.client = new Client(pipe, {
    disableMentions: "all",
    // This changes the default value for the equivalent message option, good practice imo
    // https://discord.js.org/#/docs/main/stable/typedef/MessageOptions?scrollTo=disableMentions
  });
  await pipe.client.initialize();
  menu(pipe, pipe.win);
  return true;
});

const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const { sleep } = require("../../modules/miscellaneous");

module.exports = new IpcBlock({
  channel: "invocable",
  once: false,
  invocable: true,
}, async function(pipe, event) {
  log.info("This is an example of an invocable ipc listener\n\"true\" will be returned to the render process which invoked it after 2 seconds");
  await sleep(2000);
  return true;
});

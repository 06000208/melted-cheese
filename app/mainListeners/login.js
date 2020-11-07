const ListenerBlock = require("../../modules/ListenerBlock");
const log = require("../../modules/log");

module.exports = new ListenerBlock({
  event: "login",
  once: false,
}, function(pipe) {
  log.info("The login event was emitted in the main process");
});

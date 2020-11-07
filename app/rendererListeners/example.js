const ListenerBlock = require("../../modules/ListenerBlock");
const log = require("../../modules/log");

module.exports = new ListenerBlock({
  event: "example",
  once: false,
}, function(pipe) {
  log.info("The example event was emitted in a renderer process");
});

const ListenerBlock = require("../../modules/ListenerBlock");
const log = require("../../modules/log");
const { lovely } = require("../../modules/miscellaneous");

const parse = function(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    log.error("[gateway] json could not be parsed:", error);
    return null;
  }
};

module.exports = new ListenerBlock({
  event: "message",
  once: false,
}, function(client, message) {
  if (!message.channel.name.toLowerCase().startsWith("gateway")) return;
  if (!message.content.startsWith("{") || !message.content.endsWith("}")) return;
  const data = parse(message.content);
  if (!data) return;
  log.debug("[gateway] parsed json:", data);
  message.channel.send(lovely(data, 2, true));
});

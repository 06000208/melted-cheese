const CommandModule = require("../../modules/CommandModule");
const { lovely } = require("../../modules/miscellaneous");
const log = require("../../modules/log");
const { inspect } = require("util");
const _ = require("lodash");

/*
A huge security hole/risk for development purposes: the ability to evaluate arbitrary javascript.
Should only be allowed to those who already possess the bot's token.
*/

const clean = async function(input, token) {
  let value = input;
  if (_.isNil(value)) return null;
  if (value && value.constructor.name == "Promise") {
    value = await value;
  }
  if (_.isPlainObject(value) || _.isArray(value)) {
    value = lovely(value, 2, true);
  } else {
    if (!_.isString(value)) value = inspect(value);
    value = `\`\`\`\n${value}\n\`\`\``;
  }
  // This next line is just a basic precaution to prevent the bot from accidentally posting it
  // It **does not** make eval safe!
  value = value.replace(token, "password1");
  return value;
};

module.exports = new CommandModule({
  identity: ["eval", "js"],
  summary: "Evaluates arbitrary javascript",
  description: "A huge security hole/risk for development purposes: the ability to evaluate arbitrary javascript. Should only be allowed to those who already possess the bot's token.",
  usage: "<code>",
  scope: ["dm", "text", "news"],
  nsfw: false,
  locked: "hosts",
  clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS"],
  userPermissions: null,
}, async function(client, message, code, args) {
  if (!code) return message.react(client.config.get("metadata.reactions.negative").value());
  let cleaned = null;
  try {
    const result = eval(code);
    cleaned = await clean(result, client.token);
    log.debug(`Eval from ${message.author.tag} resulted in:`, result);
    message.react(client.config.get("metadata.reactions.positive").value());
  } catch (error) {
    cleaned = await clean(error, client.token);
    log.error(`Eval from ${message.author.tag} resulted in error:`, error);
    message.react(client.config.get("metadata.reactions.negative").value());
  }
  if (cleaned && cleaned.length <= 1800) {
    message.channel.send(cleaned);
  }
});

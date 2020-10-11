const CommandBlock = require("../../modules/CommandBlock");
const log = require("../../modules/log");
const { numeric } = require("../../modules/regexes");
const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");

module.exports = new CommandBlock({
  identity: ["guild", "guilds"],
  summary: "List guilds & provides guild info",
  description: "Logs a list of guilds to the console or provides info about individual guilds when queried.",
  usage: "[guild id]",
  scope: ["dm", "text", "news"],
  nsfw: false,
  locked: "hosts",
  clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
  userPermissions: null,
}, async function(client, message, content, [id, ...args]) {
  if (!content) {
    let list = "", unavailable = 0;
    client.guilds.cache.each(guild => {
      if (guild.available) {
        list += `\n${guild.name} ${chalk.gray(`(${guild.id})`)}`;
      } else {
        ++unavailable;
      }
    });
    log.info(`List of ${client.user.tag}'s ${client.guilds.cache.size} ${!client.guilds.cache.size ? "guild" : "guilds"}${unavailable ? ` (${unavailable} unavailable)` : ""}, requested by ${message.author.tag}${list}`);
    return message.channel.send("Printed list to console");
  } else {
    if (!numeric.test(id)) return message.channel.send(`The id \`${id}\` was invalid`);
    if (!client.guilds.cache.has(id)) return message.channel.send(`The id \`${id}\` isn't mapped to a guild in the cache`);
    const guild = client.guilds.cache.get(id);
    if (!guild.available) return message.channel.send("The guild was unavailable and could not be interacted with. This is indicative of a server outage.");
    const embed = new MessageEmbed()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ format: "png" }))
      .addFields(
        { name: "Owner", value: guild.owner.user, inline: true },
        { name: "Members", value: guild.memberCount, inline: true },
        { name: "Region", value: `\`${guild.region}\``, inline: true },
      )
      .setFooter(guild.id)
      .setTimestamp(guild.createdTimestamp);
    const color = client.config.get("metadata.color").value();
    if (color) embed.setColor(color);
    return message.channel.send(`<https://discordapp.com/channels/${guild.id}/>`, embed);
  }
});

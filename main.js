const Client = require("./modules/Client");
const log = require("./modules/log");
const package = require("./package.json");
const { app, BrowserWindow } = require("electron");
const window = require("./app/window");

// Instantiate client
const client = new Client({
  disableMentions: "all",
  // This changes the default value for the equivalent message option, good practice imo
  // https://discord.js.org/#/docs/main/stable/typedef/MessageOptions?scrollTo=disableMentions
});

log.info(`Starting app v${package.version} on ${process.platform} using`, client.versions);

const init = async function() {
  await app.whenReady();
  log.info("Electron has been initialized");
  const discordCommands = await client.handler.requireDirectory(client.commands, client.config.get("commands.directory").value(), true);
  log.info(discordCommands.message);
  const discordEvents = await client.handler.requireDirectory(client.events, client.config.get("events.directory").value(), true);
  log.info(discordEvents.message);
  await client.pipe.initiate(client.handler);
  log.info("Adding event listeners to app...");
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) window();
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      log.info("All windows have been closed, quitting app");
      app.quit();
    }
  });
  log.info("Creating window");
  window();
};

init();

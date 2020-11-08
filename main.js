const MainPipe = require("./modules/MainPipe");
const log = require("./modules/log");
const package = require("./package.json");
const { app, BrowserWindow } = require("electron");
const window = require("./app/window");

// Instantiate the main pipe
const pipe = new MainPipe("./app/ipcMain/", "./app/mainListeners/", "mainModules", {
  disableMentions: "all",
  // This changes the default value for the equivalent message option, good practice imo
  // https://discord.js.org/#/docs/main/stable/typedef/MessageOptions?scrollTo=disableMentions
});

log.info(`Starting app v${package.version} on ${process.platform} using`, pipe.versions);

const initialize = async function() {
  await app.whenReady();
  log.info("Electron has been initialized");
  await pipe.initialize();
  await pipe.client.initialize();
  log.info(`Main pipe's client has been initialized`);
  log.info("Adding event listeners to electron app...");
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) window(pipe);
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      log.info("All windows have been closed, quitting app");
      app.quit();
    }
  });
  log.info("Creating window");
  window(pipe);
};

initialize();

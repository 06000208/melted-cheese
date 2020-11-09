/* eslint-disable no-unused-vars */
const { BrowserWindow } = require("electron");
const path = require("path");
const menu = require("./menu");

module.exports = function(pipe) {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#eeeeee",
  });
  menu(pipe, win);
  win.loadFile("./web/index.html");
  Object.defineProperty(pipe, "win", { value: win });
};

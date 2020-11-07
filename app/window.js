const { BrowserWindow, Menu, MenuItem } = require("electron");
const path = require("path");
const { find } = require("lodash");
const log = require("../modules/log");

module.exports = function(pipe) {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#eeeeee",
  });
  // https://www.electronjs.org/docs/api/menu
  // https://www.electronjs.org/docs/api/menu-item
  const menu = new Menu();
  const defaultMenu = Menu.getApplicationMenu();
  const authMenu = new Menu();
  authMenu.append(new MenuItem({
    label: "Login",
    // eslint-disable-next-line no-unused-vars
    click: (menuItem, browserWindow, event) => {
      // console.log(menuItem, browserWindow, event);
      log.info("You clicked the login button. The menu bar is handled by the main process");
      win.webContents.send("login");
      pipe.emit("login");
    },
  }));
  menu.append(new MenuItem({
    label: "Authentication",
    submenu: authMenu,
  }));
  menu.append(find(defaultMenu.items, { role: "filemenu", label: "File" }));
  menu.append(find(defaultMenu.items, { role: "editmenu", label: "Edit" }));
  menu.append(find(defaultMenu.items, { role: "viewmenu", label: "View" }));
  menu.append(find(defaultMenu.items, { role: "windowmenu", label: "Window" }));
  Menu.setApplicationMenu(menu);
  win.loadFile("./web/index.html");
};

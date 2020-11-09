/* eslint-disable no-unused-vars */
const { Menu, MenuItem } = require("electron");
const { find } = require("lodash");

module.exports = function(pipe, win) {
  // https://www.electronjs.org/docs/api/menu
  // https://www.electronjs.org/docs/api/menu-item
  const menu = new Menu();
  const defaultMenu = Menu.getApplicationMenu();
  const netMenu = new Menu();
  netMenu.append(new MenuItem({
    label: "Connect",
    click: (menuItem, browserWindow, event) => {
      win.webContents.send("login");
    },
    enabled: !pipe.client.online,
  }));
  netMenu.append(new MenuItem({
    label: "Disconnect",
    click: (menuItem, browserWindow, event) => {
      win.webContents.send("logout");
    },
    enabled: pipe.client.online,
  }));
  menu.append(find(defaultMenu.items, { role: "filemenu", label: "File" }));
  menu.append(find(defaultMenu.items, { role: "editmenu", label: "Edit" }));
  menu.append(find(defaultMenu.items, { role: "viewmenu", label: "View" }));
  menu.append(find(defaultMenu.items, { role: "windowmenu", label: "Window" }));
  menu.append(new MenuItem({
    label: "Online",
    submenu: netMenu,
  }));
  Menu.setApplicationMenu(menu);
};

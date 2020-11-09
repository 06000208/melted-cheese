const IpcBlock = require("../../modules/IpcBlock");
const log = require("../../modules/log");
const { token } = require("../../modules/regexes");
const { ipcRenderer } = require("electron");


module.exports = new IpcBlock({
  channel: "login",
  once: false,
}, async function(pipe, event) {
  const element = document.getElementById("token");
  if (!element || !element.value || !element.value.length) {
    log.debug("Cannot login, no input");
    element.style.borderColor = "#0366d6";
    await new Promise((resolve) => { setTimeout(resolve, 800); });
    element.removeAttribute("style");
    return;
  }
  if (!token.test(element.value)) {
    log.debug("Cannot login, input did not match token pattern");
    element.style.borderColor = "#d63f03";
    await new Promise((resolve) => { setTimeout(resolve, 800); });
    element.removeAttribute("style");
    return;
  }
  const login = await ipcRenderer.invoke("login", element.value);
  log.debug(login);
});

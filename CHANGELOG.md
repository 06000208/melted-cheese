## `0.0.1` / `2020-XX-XX`

_The changelog for this version is incomplete/w.i.p and currently being written in tandem with the development of this version_

- Setup the repository and adapted it (issue labels, changelog, readme, contributing, etc.)
- Added `browser` to the eslint environments
- Added dice icons under `./assets/icons/`. They aren't ideal as they're hard to make out and show up notably crunched when used as electron's app icon.
- Installed electron and configured `package.json`'s npm start script to launch it.
- Removed `run.bat`. Use `npm start` in a normal cmd window for now.
- Updated `index.js` for electron, removed version start message, and updated version checks
- Created `main.js`. This is the new electron equivalent for `bot.js`, and represents the code running in the main process. The start up message with version numbers is now in here.
  - Note that while the client is instantiated and modules loaded, no attempt is made to login yet. That will be up to the user and the gui.
- Created the `/app/` directory. This contains the new `window.js`, `renderer.js`, and `preload.js`
- `index.html` and css files `basic.css`, `extras.css`, and `grid.css`. Subject to massive changes and renames, this is just a starting point.
  - Currently uses a holy grail CSS grid layout with a header, left, content, right, and footer.
  - I'm opting not go for a custom title bar like atom, visual studio code, etc. does, at least for now. My main reasons for this are better cross platform support and wanting to make use of the native menu bar (which runs in the main process!)
- Updated the handler class (and `defaultData.js`) to support multiple instances through controlling what file name the modules db uses
- ~~Inter-process Communication Infrastructure through the `IpcBlock`, `IpcConstruct`, `Pipe`, `PipeMain`, and `PipeRender` classes.~~
  - ~~`PipeRender` is instantiated on window (`window.pipe`) in the renderer process and has it's own Handler, while `PipeMain` is instantiated on the client (`client.pipe`) and uses it's handler.~~
  - As electron's ipc objects extend node's EventEmitters, the construct and block classes are similar to EventConstruct and ListenerBlock, but rewritten for IPC. They support both normal and [invoked](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) listeners.
  - ~~Listeners loaded by an end of a pipe (`PipeMain` and `PipeRender`) will have their pipe as the first argument. Additionally, `pipe.client` and `pipe.window` are accessible on their respective pipes.~~
  - Pipe ends are planned to be populated with many properties and methods for their respective side of the app.
  - Currently, the login menu button performs a simple back/forth test with IPC. This can be seen in the logs (node.js terminal and the developer tools console)
- Updated `client.js` with the changes to the handler, an instance of MainPipe, and an object of version numbers.

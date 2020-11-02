const { Collection } = require("discord.js");
const BaseConstruct = require("./BaseConstruct");
const IpcBlock = require("./IpcBlock");
const { collectionArrayPush, collectionArrayFilter } = require("./miscellaneous");

/**
 * Construct for electron's inter-process communication
 * @extends {BaseConstruct}
 */
class IpcConstruct extends BaseConstruct {
  /**
   * @param {EventEmitter} ipc
   * @param {Pipe} pipe
   * @param {string} [name]
   */
  constructor(ipc, pipe, name) {
    super(name);

    /**
     * Reference to the ipc this IpcConstruct is for
     * @name IpcConstruct#ipc
     * @type {EventEmitter}
     * @readonly
     */
    Object.defineProperty(this, "ipc", { value: ipc });

    /**
     * Reference to the pipe this IpcConstruct is for
     * @name IpcConstruct#pipe
     * @type {Pipe}
     * @readonly
     */
    Object.defineProperty(this, "pipe", { value: pipe });

    /**
     * Cached IpcBlocks mapped by their ids
     * @type {Collection<Snowflake, IpcBlock>}
     * @name IpcConstruct#cache
     */

    /**
     * Module file paths mapped to arrays containing the ids of IpcBlocks originating from that module. If anonymous IpcBlocks have been loaded, `null` is mapped to an array of their ids
     * @type {Collection<?string, [Snowflake]>}
     * @name IpcConstruct#idsByPath
     */

    /**
     * Channel names mapped to arrays of ids for IpcBlocks that target those channels
     * @type {Collection<string, [Snowflake]>}
     */
    this.idsByChannel = new Collection();

    /**
     * Channel names mapped to arrays of file paths for modules that add listeners for those channels
     * @type {Collection<string, [string]>}
     */
    this.pathsByChannel = new Collection();
  }

  /**
   * @param {IpcBlock} block
   * @param {?string} [filePath]
   */
  load(block, filePath) {
    // validation
    if (block instanceof IpcBlock === false) return;
    // parent
    super.load(block, filePath);
    // bind correct this value & prefix pipe as the first parameter
    block.run = block.run.bind(block, this.pipe);
    // .once() or .on()
    if (block.once) {
      this.ipc.once(block.channel, block.run);
    } else {
      this.ipc.on(block.channel, block.run);
    }
    // collections
    collectionArrayPush(this.idsByChannel, block.channel, block.id);
    collectionArrayPush(this.pathsByChannel, block.channel, block.filePath);
  }

  /**
   * @param {IpcBlock} block
   */
  unload(block) {
    // validation
    if (block instanceof IpcBlock === false) return;
    // parent
    super.unload(block);
    // remove listener
    if (this.ipc.listeners(block.channel).includes(block.run)) {
      this.ipc.removeListener(block.channel, block.run);
    }
    // collections
    collectionArrayFilter(this.pathsByChannel, block.channel, block.filePath);
    collectionArrayFilter(this.idsByChannel, block.channel, block.id);
  }
}

module.exports = IpcConstruct;

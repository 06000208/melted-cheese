const BaseBlock = require("./BaseBlock");
const { has, isPlainObject, isFunction, isString, isNil, isBoolean } = require("lodash");

/**
 * @typedef {Object} ListenerData
 * @property {string} channel
 * @property {?boolean} [once=false]
 * @property {?boolean} [invocable=false]
 */

/**
 * Callback function called when a channel is invoked
 * @callback listener
 * @param {Pipe} pipe - Bound as first parameter by IpcConstruct.load()
 * @param {...*} - Provided by the channel being invoked
 * @todo Should the bound parameter be included?
 * @todo Is there a way to specify that this callback's this value is an instance of IpcBlock?
 */

/**
 * @extends {BaseBlock}
 */
class IpcBlock extends BaseBlock {
  /**
   * @param {ListenerData} data
   * @param {listener} run
   */
  constructor(data = {}, run) {
    super();
    IpcBlock.validateParameters(data, run);

    // Data

    /**
     * The name of the channel this listener is for
     * @type {string}
     */
    this.channel = data.channel;

    /**
     * Whether the listener should only trigger once (whether .on() or .once() is used)
     * @type {boolean}
     */
    this.once = Boolean(data.once);

    /**
     * Whether the listener should be considered invocable and listened to using ipcMain.handle()
     * @type {boolean}
     */
    this.invocable = Boolean(data.invocable);

    // Methods
    // Note that bind() isn't used here in favor of doing it in IpcConstruct's load method, so it can bind parameters as well

    /**
     * Callback function called when the channel named by the IpcBlock.channel property is invoked
     * @type {listener}
     */
    this.run = run;
  }

  /**
   * @param {ListenerData} data
   * @param {listener} run
   * @private
   * @todo May be worth looking into schema based validation
   */
  static validateParameters(data, run) {
    if (!isPlainObject(data)) throw new TypeError("Listener data parameter must be an Object.");
    if (!isFunction(run)) throw new TypeError("Listener run parameter must be a function.");
    if (!isString(data.channel)) throw new TypeError("Parameter data.channel must be a string.");
    if (has(data, "once") && !isNil(data.once)) if (!isBoolean(data.once)) throw new TypeError("Parameter data.once must be a boolean if included.");
    if (has(data, "invocable") && !isNil(data.invocable)) if (!isBoolean(data.invocable)) throw new TypeError("Parameter data.invocable must be a boolean if included.");
  }

}

module.exports = IpcBlock;

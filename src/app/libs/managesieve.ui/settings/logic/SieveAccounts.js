/*
 * The content of this file is licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 */


(function (exports) {

  "use strict";

  const CONFIG_ID_GLOBAL = "global";
  const CONFIG_KEY_ACCOUNTS = "accounts";

  const { SieveLogger } = require("./../../utils/SieveLogger.js");

  const { SievePrefManager } = require('./SievePrefManager.js');

  const { SieveAccount } = require("./SieveAccount.js");
  const { SieveAbstractAccounts } = require("./SieveAbstractAccounts.js");

  /**
   * Manages the configuration for sieve accounts.
   * It behaves like a directory. Ist just lists the accounts.
   * The individual settings are managed by the SieveAccount object
   *
   * It uses the DOM's local store to persist the configuration data.
   */
  class SieveAccounts extends SieveAbstractAccounts {

    /**
     * @inheritdoc
     */
    async load() {

      const items = await (new SievePrefManager(CONFIG_ID_GLOBAL)).getComplexValue(CONFIG_KEY_ACCOUNTS, []);

      const accounts = {};

      SieveLogger.getInstance().level(await this.getLogLevel());

      if (!items)
        return this;

      for (const item of items) {
        // Recreate the accounts only when needed...
        if (this.accounts[item])
          accounts[item] = this.accounts[item];
        else
          accounts[item] = new SieveAccount(item);
      }

      this.accounts = accounts;
      return this;
    }

    /**
     * Saves the list of account configurations.
     *
     * @returns {SieveAccounts}
     *   a self reference.
     */
    async save() {
      await (new SievePrefManager(CONFIG_ID_GLOBAL)).setComplexValue(CONFIG_KEY_ACCOUNTS, [...Object.keys(this.accounts)]);
      return this;
    }

    /**
     * Creates a new account.
     * The new account will be initialized with default and then added to the list of accounts
     *
     * @param {object} [details]
     *   the accounts details like the name, hostname, port and username as key value pairs.
     *
     * @returns {SieveAccounts}
     *   a self reference.
     */
    async create(details) {

      // create a unique id;

      const id = this.generateId();

      this.accounts[id] = new SieveAccount(id);

      await this.save();

      if (typeof (details) === "undefined" || details === null)
        return this;

      if ((details.hostname !== null) && (details.hostname !== undefined))
        await (await this.accounts[id].getHost()).setHostname(details.hostname);

      if ((details.port !== null) && (details.port !== undefined))
        await (await this.accounts[id].getHost()).setPort(details.port);

      if ((details.username !== null) && (details.username !== undefined))
        await (await this.accounts[id].getAuthentication(1)).setUsername(details.username);

      if ((details.name !== null) && (details.name !== undefined))
        await (await this.accounts[id].getHost()).setDisplayName(details.name);

      return this;
    }

    /**
     * Removes the account including all settings.
     *
     * @param {AccountId} id
     *   the unique id which identifies the account.
     * @returns {SieveAccounts}
     *   a self reference
     */
    async remove(id) {
      // remove the accounts...
      delete this.accounts[id];
      // ... an persist it.
      await this.save();

      return this;
    }


  }

  // Require modules need to use export.module
  if (module.exports)
    module.exports.SieveAccounts = SieveAccounts;
  else
    exports.SieveAccounts = SieveAccounts;

})(this);

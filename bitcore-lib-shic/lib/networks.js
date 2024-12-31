'use strict';
var _ = require('lodash');

var BufferUtil = require('./util/buffer');
var JSUtil = require('./util/js');
var networks = [];
var networkMaps = {};

/**
 * A network is merely a map containing values that correspond to version
 * numbers for each Shibacoin network.
 * @constructor
 */
function Network() {}

Network.prototype.toString = function toString() {
  return this.name;
};

/**
 * @function
 * @member Networks#remove
 * Will remove a custom network
 * @param {Network} network
 */
function removeNetwork(network) {
  if (typeof network !== 'object') {
    network = get(network);
  }
  for (var i = 0; i < networks.length; i++) {
    if (networks[i] === network) {
      networks.splice(i, 1);
    }
  }
  for (var key in networkMaps) {
    if (networkMaps[key].length) {
      const index = networkMaps[key].indexOf(network);
      if (index >= 0) {
        networkMaps[key].splice(index, 1);
      }
      if (networkMaps[key].length === 0) {
        delete networkMaps[key];
      }
    } else if (networkMaps[key] === network) {
      delete networkMaps[key];
    }
  }
}

/**
 * @function
 * @member Networks#get
 * Retrieves the network associated with a magic number or string.
 * @param {string|number|Network} arg
 * @param {string|Array} keys - if set, only check if the magic number associated with this name matches
 * @return Network
 */
function get(arg, keys) {
  if (~networks.indexOf(arg)) {
    return arg;
  }
  if (keys) {
    if (!_.isArray(keys)) {
      keys = [keys];
    }
    var containsArg = function(key) {
      return networks[index][key] === arg;
    };
    for (var index in networks) {
      if (_.some(keys, containsArg)) {
        return networks[index];
      }
    }
    return undefined;
  }
  if (networkMaps[arg] && networkMaps[arg].length >= 1) {
    return networkMaps[arg][0];
  } else {
    return networkMaps[arg];
  }
}
/**
 * @function
 * @member Networks#add
 * Will add a custom Network
 * @param {Object} data
 * @param {string} data.name - The name of the network
 * @param {string} data.alias - The aliased name of the network
 * @param {Number} data.pubkeyhash - The publickey hash prefix
 * @param {Number} data.privatekey - The privatekey prefix
 * @param {Number} data.scripthash - The scripthash prefix
 * @param {Number} data.xpubkey - The extended public key magic
 * @param {Number} data.xprivkey - The extended private key magic
 * @param {Number} data.networkMagic - The network magic number
 * @param {Number} data.port - The network port
 * @param {Array}  data.dnsSeeds - An array of dns seeds
 * @return Network
 */
function addNetwork(data) {
  var network = new Network();
  JSUtil.defineImmutable(network, {
    name: data.name,
    alias: data.alias,
    pubkeyhash: data.pubkeyhash,
    privatekey: data.privatekey,
    scripthash: data.scripthash,
    xpubkey: data.xpubkey,
    xprivkey: data.xprivkey
  });
  if (data.networkMagic) {
    JSUtil.defineImmutable(network, {
      networkMagic: BufferUtil.integerAsBuffer(data.networkMagic)
    });
  }
  if (data.port) {
    JSUtil.defineImmutable(network, {
      port: data.port
    });
  }
  if (data.dnsSeeds) {
    JSUtil.defineImmutable(network, {
      dnsSeeds: data.dnsSeeds
    });
  }
  _.each(network, function(value) {
    if (!_.isUndefined(value) && !_.isObject(value)) {
      if (!networkMaps[value]) {
        networkMaps[value] = [];
      }
      networkMaps[value].push(network);
    }
  });
  networks.push(network);
  return network;
}

// Livenet (Mainnet) configuration for Shibacoin
addNetwork({
  name: 'livenet',
  alias: 'mainnet',
  pubkeyhash: 0x3f, // PUBKEY_ADDRESS for livenet
  privatekey: 0x9e, // SECRET_KEY for livenet
  scripthash: 0x16, // SCRIPT_ADDRESS for livenet
  xpubkey: 0x02fadafe, // EXT_PUBLIC_KEY for livenet
  xprivkey: 0x02fac495, // EXT_SECRET_KEY for livenet
  networkMagic: 0xb0c0e0f0, // pchMessageStart for livenet
  port: 33864, // nDefaultPort for livenet
  dnsSeeds: ['seeds.shibainucoin.net'], // DNS seeds for livenet
});

/**
 * @instance
 * @member Networks#livenet
 */
var livenet = get('livenet');

// Testnet configuration for Shibacoin
addNetwork({
  name: 'testnet',
  alias: 'test',
  pubkeyhash: 0x71, // PUBKEY_ADDRESS for testnet
  privatekey: 0xf1, // SECRET_KEY for testnet
  scripthash: 0xc4, // SCRIPT_ADDRESS for testnet
  xpubkey: 0x043588cb, // EXT_PUBLIC_KEY for testnet
  xprivkey: 0x04358195, // EXT_SECRET_KEY for testnet
  networkMagic: 0xfac3dacd, // pchMessageStart for testnet
  port: 44864, // nDefaultPort for testnet
  dnsSeeds: ['seeds-testnet.shibainucoin.net'], // DNS seeds for testnet
});

/**
 * @instance
 * @member Networks#testnet
 */
var testnet = get('testnet');

// Regtest configuration for Shibacoin
addNetwork({
  name: 'regtest',
  alias: 'regtest',
  pubkeyhash: 0x6f, // PUBKEY_ADDRESS for regtest
  privatekey: 0xef, // SECRET_KEY for regtest
  scripthash: 0xc4, // SCRIPT_ADDRESS for regtest
  xpubkey: 0x043584cd, // EXT_PUBLIC_KEY for regtest
  xprivkey: 0x04358297, // EXT_SECRET_KEY for regtest
  networkMagic: 0xfcbdb3dc, // pchMessageStart for regtest
  port: 18444, // nDefaultPort for regtest
  dnsSeeds: [], // No DNS seeds for regtest
});

/**
 * @instance
 * @member Networks#regtest
 */
var regtest = get('regtest');

module.exports = {
  add: addNetwork,
  remove: removeNetwork,
  defaultNetwork: livenet,
  livenet: livenet,
  mainnet: livenet,
  testnet: testnet,
  regtest: regtest,
  get: get,
};
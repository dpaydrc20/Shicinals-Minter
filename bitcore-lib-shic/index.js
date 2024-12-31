'use strict';

var dogecore = module.exports;

// module information
dogecore.version = 'v' + require('./package.json').version;
dogecore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of dogecore found. ' +
      'Please make sure to require dogecore and check that submodules do' +
      ' not also include their own dogecore dependency.';
    throw new Error(message);
  }
};
dogecore.versionGuard(global._dogecore);
global._dogecore = dogecore.version;

// crypto
dogecore.crypto = {};
dogecore.crypto.BN = require('./lib/crypto/bn.js');
dogecore.crypto.ECDSA = require('./lib/crypto/ecdsa.js');
dogecore.crypto.Hash = require('./lib/crypto/hash.js');
dogecore.crypto.Random = require('./lib/crypto/random.js');
dogecore.crypto.Point = require('./lib/crypto/point.js');
dogecore.crypto.Signature = require('./lib/crypto/signature.js');

// encoding
dogecore.encoding = {};
dogecore.encoding.Base58 = require('./lib/encoding/base58.js');
dogecore.encoding.Base58Check = require('./lib/encoding/base58check.js');
dogecore.encoding.BufferReader = require('./lib/encoding/bufferreader.js');
dogecore.encoding.BufferWriter = require('./lib/encoding/bufferwriter.js');
dogecore.encoding.Varint = require('./lib/encoding/varint.js');

// utilities
dogecore.util = {};
dogecore.util.buffer = require('./lib/util/buffer.js');
dogecore.util.js = require('./lib/util/js.js');
dogecore.util.preconditions = require('./lib/util/preconditions.js');

// errors thrown by the library
dogecore.errors = require('./lib/errors/index.js');

// main bitcoin library
dogecore.Address = require('./lib/address.js');
dogecore.Block = require('./lib/block/index.js');
dogecore.MerkleBlock = require('./lib/block/merkleblock.js');
dogecore.BlockHeader = require('./lib/block/blockheader.js');
dogecore.HDPrivateKey = require('./lib/hdprivatekey.js');
dogecore.HDPublicKey = require('./lib/hdpublickey.js');
dogecore.Networks = require('./lib/networks.js');
dogecore.Opcode = require('./lib/opcode.js');
dogecore.PrivateKey = require('./lib/privatekey.js');
dogecore.PublicKey = require('./lib/publickey.js');
dogecore.Script = require('./lib/script/index.js');
dogecore.Transaction = require('./lib/transaction/index.js');
dogecore.URI = require('./lib/uri.js');
dogecore.Unit = require('./lib/unit.js');

// dependencies, subject to change
dogecore.deps = {};
dogecore.deps.bnjs = require('bn.js');
dogecore.deps.bs58 = require('bs58');
dogecore.deps.Buffer = Buffer;
dogecore.deps.elliptic = require('elliptic');
dogecore.deps.scryptsy = require('scryptsy');
dogecore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
dogecore._HDKeyCache = require('./lib/hdkeycache.js');
dogecore.Transaction.sighash = require('./lib/transaction/sighash.js');

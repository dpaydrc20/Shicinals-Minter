# Shicinals

A minter and protocol for inscriptions on Shibacoin. 

## ⚠️⚠️⚠️ Important ⚠️⚠️⚠️

Use this wallet for inscribing only! Avoid storing shicinals in Shiba core.

Please use a fresh paper wallet to mint to with nothing else in it until proper wallet for shicinals support comes.. 

This wallet is not meant for storing funds or inscriptions.

## Prerequisites

To use this, you'll need to setup a Shiba node, clone this repo and install Node.js on your computer.

### Setup Shibainu node

Install Shiba Coin Core from the official Shiba Coin github: (https://github.com/shibacoinppc/shibacoin)

### ⚠️⚠️⚠️ Important ⚠️⚠️⚠️
A configuration file needs to be created before you continue with the sync.

-Stop your node

-Create a `shibacoin.conf` file in your Shibacoin data folder.

-Copy and paste this to the created file. Set your own username/password. Save it!

```
rpcuser=ape
rpcpassword=zord
rpcport=33864
server=1
listen=1
txindex=1
rpcallowip=127.0.0.1
```

-Start your node again

-Wait for your node to sync with the network.

==========

### Install NodeJS

Please head over to (https://nodejs.org/en/download) and follow the installation instructions for your system.

==========


### Setup Pepinals

#### Clone Shicinals minter
On your Terminal, type the following commands:
```
cd
git clone (https://github.com/dpaydrc20/Shicinals-Minter.git)
```
#### Setup minter

```
cd shicinals
npm install
cd bitcore-lib-shic
npm install
cd ..
``` 

After all dependencies are solved, you can configure the environment:

#### Configure environment

Create a `.env` file with your node information. Set the same username/password used in `shibacoin.conf`.

```
NODE_RPC_URL=http://127.0.0.1:33864
NODE_RPC_USER=ape
NODE_RPC_PASS=zord
TESTNET=false
```

==========

#### ⚠️⚠️⚠️ Important ⚠️⚠️⚠️
Before proceeding, please make sure your node is fully synced.
Have fun!

### Managing wallet balance

Generate a new `.wallet.json` file:

```
node . wallet new
```

Retrieve your private key from `.wallet.json` and import it in Shibacoin Core, this can be done from the GUI or the following command

```
pepecoin-cli importprivkey <your_private_key> <optional_label> false
```

Then send SHBI to the address displayed. Once sent, sync your wallet:

```
node . wallet sync
```

If you are minting a lot, you can split up your UTXOs:

```
node . wallet split <count>
```

When you are done minting, send the funds back:

```
node . wallet send <address> <optional amount>
```

==========


### Minting Shicinals

**Note**: Please use a fresh wallet to mint to with nothing else in it until proper wallet for shicinals support comes. 

**Do not mint to Shibacoin Core**

#### Inscribe a file
From file:

```
node . mint <address> <path>
```

From data:

```
node . mint <address> <content type> <hex data>
```

Examples:

```
node . mint PpB1ocks3ozcti7m5a3i2wViSuFAchLm3n pepe.jpeg
```

```
node . mint PpB1ocks3ozcti7m5a3i2wViSuFAchLm3n "text/plain;charset=utf-8" 52696262697421 
```

#### Deploy SHC-20

```
node . shc-20 deploy <address> <ticker> <max token supply> <max allowed mint limit>
```

Examples: 

```
node . shc-20 deploy PpB1ocks3ozcti7m5a3i2wViSuFAchLm3n frog 1000 100
```

#### Mint SHC-20

```
node . shc-20 mint <address> <ticker> <amount>
```

Examples: 

```
node . shc-20 mint PpB1ocks3ozcti7m5a3i2wViSuFAchLm3n frog 100
```

### Viewing Shicinals

Viewing small inscriptions seems to work. Investigating...

Start the server:

```
node . server
```

And open your browser to:

```
http://localhost:3000/tx/4650300f65470c359c070ae6b88ab7945adad68458c33285968ce0bfa502e52c
```

==========


### Additional Info

#### Protocol

The shicinals protocol allows any size data to be inscribed onto subwoofers.

An inscription is defined as a series of push datas:

```
"ord"
OP_1
"text/plain;charset=utf-8"
OP_0
"Ribbit!"
```

For shicinals, we introduce a couple extensions. First, content may spread across multiple parts:

```
"ord"
OP_2
"text/plain;charset=utf-8"
OP_1
"Ribbit and "
OP_0
"ribbit ribbit!"
```

This content here would be concatenated as "Ribbit and ribbit ribbit!". This allows up to ~1500 bytes of data per transaction.

Second, P2SH is used to encode inscriptions.

There are no restrictions on what P2SH scripts may do as long as the redeem scripts start with inscription push datas.

And third, inscriptions are allowed to chain across transactions:

Transaction 1:

```
"ord"
OP_2
"text/plain;charset=utf-8"
OP_1
"Ribbit and "
```

Transaction 2

```
OP_0
"ribbit ribbit!"
```

With the restriction that each inscription part after the first must start with a number separator, and number separators must count down to 0.

This allows indexers to know how much data remains.


### Troubleshooting

#### I'm getting ECONNREFUSED errors when minting

There's a problem with the node connection. Your `shibacoin.conf` file should look something like:

```
rpcuser=ape
rpcpassword=zord
rpcport=33864
server=1
listen=1
txindex=1
rpcallowip=127.0.0.1
```

Make sure `port` is not set to the same number as `rpcport`. Also make sure `rpcauth` is not set.

Your `.env file` should look like:

```
NODE_RPC_URL=http://127.0.0.1:33864
NODE_RPC_USER=ape
NODE_RPC_PASS=zord
TESTNET=false
```

#### Other issues

Try restarting your Shibacoin node.

If still stuck, ask ChatGPT or search online for other solutions.

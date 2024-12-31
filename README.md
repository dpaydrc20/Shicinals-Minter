# Pepinals

A minter and protocol for inscriptions on Pepecoin. 

## ⚠️⚠️⚠️ Important ⚠️⚠️⚠️

Use this wallet for inscribing only! Avoid storing pepinals in pepecoin core.

Please use a fresh paper wallet to mint to with nothing else in it until proper wallet for pepinals support comes.. 

This wallet is not meant for storing funds or inscriptions.

## Prerequisites

To use this, you'll need to setup a Pepecoin node, clone this repo and install Node.js on your computer.

### Setup Pepecoin node

Install Pepecoin Core from the official Pepecoin github: (https://github.com/pepecoinppc/pepecoin/releases)

### ⚠️⚠️⚠️ Important ⚠️⚠️⚠️
A configuration file needs to be created before you continue with the sync.

-Stop your node

-Create a `pepecoin.conf` file in your Pepecoin data folder.

-Copy and paste this to the created file. Set your own username/password. Save it!

```
rpcuser=ape
rpcpassword=zord
rpcport=22555
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

#### Clone Pepinal minter
On your Terminal, type the following commands:
```
cd
git clone https://github.com/PepeEnthusiast/Pepinals.git
```
#### Setup minter

```
cd Pepinals
npm install
cd bitcore-lib-pepe
npm install
cd ..
``` 

After all dependencies are solved, you can configure the environment:

#### Configure environment

Create a `.env` file with your node information. Set the same username/password used in `pepecoin.conf`.

```
NODE_RPC_URL=http://127.0.0.1:22555
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

Retrieve your private key from `.wallet.json` and import it in Pepecoin Core, this can be done from the GUI or the following command

```
pepecoin-cli importprivkey <your_private_key> <optional_label> false
```

Then send PEPE to the address displayed. Once sent, sync your wallet:

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


### Minting Pepinals

**Note**: Please use a fresh wallet to mint to with nothing else in it until proper wallet for pepinals support comes. 

**Do not mint to Pepecoin Core**

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

#### Deploy PRC-20

```
node . prc-20 deploy <address> <ticker> <max token supply> <max allowed mint limit>
```

Examples: 

```
node . prc-20 deploy PpB1ocks3ozcti7m5a3i2wViSuFAchLm3n frog 1000 100
```

#### Mint PRC-20

```
node . prc-20 mint <address> <ticker> <amount>
```

Examples: 

```
node . prc-20 mint PpB1ocks3ozcti7m5a3i2wViSuFAchLm3n frog 100
```

### Viewing Pepinals

**Note**: There is currently as bug preventing to preview some larger pepinals files. Wait for a fix or a pepinals indexer. 

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

The pepinals protocol allows any size data to be inscribed onto subwoofers.

An inscription is defined as a series of push datas:

```
"ord"
OP_1
"text/plain;charset=utf-8"
OP_0
"Ribbit!"
```

For pepinals, we introduce a couple extensions. First, content may spread across multiple parts:

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

There's a problem with the node connection. Your `pepecoin.conf` file should look something like:

```
rpcuser=ape
rpcpassword=zord
rpcport=22555
server=1
listen=1
txindex=1
rpcallowip=127.0.0.1
```

Make sure `port` is not set to the same number as `rpcport`. Also make sure `rpcauth` is not set.

Your `.env file` should look like:

```
NODE_RPC_URL=http://127.0.0.1:22555
NODE_RPC_USER=ape
NODE_RPC_PASS=zord
TESTNET=false
```

#### Other issues

Try restarting your Pepecoin node.

If still stuck, ask ChatGPT or search online for other solutions.
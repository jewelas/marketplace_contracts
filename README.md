## Install environment.

Change **.env.example** to **.env**.

Sing In **https://www.alchemy.com/** to get **API_URL_MUMBAI** and **API_URL_POLYGON** for deploying contracts.

Sign In **https://polygonscan.com/** to get **POLYGON_API_KEY** for verification of contracts.

Add private key and public key to sign the deployment transactions.

Add NEW_PROTOCOL_FEE: 600 for 6%.

Add NEW_DEFAULT_FEE_RECEIVER for Royalties Fee Receiver address.


Install node modules.

```bash
yarn

yarn bootstrap
```

## Deploy on test network.

```bash
yarn testnet
```

## Verify Contract on test network.

```bash
npx hardhat verify contractAddress --network mumbai
```

## Deploy to main net.

```bash
yarn mainnet
```

## Verify Contract on main network.

```bash
npx hardhat verify contractAddress --network polygon
```

require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
const { ethers, upgrades, run } = require("hardhat");

async function main() {
  const ERC721LazyMintTransferProxy = await ethers.getContractFactory(
    "@rarible/transfer-proxy/contracts/lazy-mint/erc721/ERC721LazyMintTransferProxy.sol:ERC721LazyMintTransferProxy"
  );
  const ERC1155LazyMintTransferProxy = await ethers.getContractFactory(
    "@rarible/transfer-proxy/contracts/lazy-mint/erc1155/ERC1155LazyMintTransferProxy.sol:ERC1155LazyMintTransferProxy"
  );

  const lazyTransferProxy721 = await upgrades.deployProxy(ERC721LazyMintTransferProxy, [], {
    initializer: "__OperatorRole_init",
  });
  await lazyTransferProxy721.deployed();

  console.log(lazyTransferProxy721.address, " lazyTransferProxy721 (proxy) address");
  console.log(
    await upgrades.erc1967.getImplementationAddress(lazyTransferProxy721.address),
    " lazyTransferProxy721  implementation address"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(lazyTransferProxy721.address),
    " lazyTransferProxy721  admin address\n"
  );



  const lazyTransferProxy1155 = await upgrades.deployProxy(ERC1155LazyMintTransferProxy, [], {
    initializer: "__OperatorRole_init",
  });
  await lazyTransferProxy1155.deployed();

  console.log(lazyTransferProxy1155.address, " lazyTransferProxy1155 (proxy) address");
  console.log(
    await upgrades.erc1967.getImplementationAddress(lazyTransferProxy1155.address),
    " lazyTransferProxy1155  implementation address"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(lazyTransferProxy1155.address),
    " lazyTransferProxy1155  admin address\n"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

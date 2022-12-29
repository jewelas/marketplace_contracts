// test/Rematic.proxy.js
// Load dependencies
// const { expect } = require("chai");
require("dotenv").config();
const { ethers, upgrades } = require("hardhat");
const { BigNumber } = require("ethers");

const { NEW_PROTOCOL_FEE, NEW_DEFAULT_FEE_RECEIVER } = process.env;

let TransferProxy;
let ERC20TransferProxy;
let ERC721LazyMintTransferProxy;
let ERC1155LazyMintTransferProxy;
let ERC721Rarible;
let ERC1155Rarible;
let ERC721RaribleFactoryC2;
let RoyaltiesRegistry;
let ExchangeV2;
let ERC721RaribleBeacon;
let ERC1155RaribleBeacon;
let ERC1155RaribleFactoryC2;
let transferProxy;
let erc20TransferProxy;
let lazyTransferProxy721;
let lazyTransferProxy1155;
let royaltiesRegistry;
let erc721rarible;
let erc1155rarible;
let exchangeV2;
let erc721raribleFactoryC2;
let erc721RaribleBeacon;
let erc1155RaribleBeacon;
let erc1155raribleFactoryC2;
let ERC721RaribleMinimal;
let erc721raribleMinimal;
let BeaconProxy;

// Start test block
describe("Rarible Redeployment", function () {
  beforeEach(async function () {
    TransferProxy = await ethers.getContractFactory("TransferProxy");
    ERC20TransferProxy = await ethers.getContractFactory("ERC20TransferProxy");
    ERC721LazyMintTransferProxy = await ethers.getContractFactory("ERC721LazyMintTransferProxy");
    ERC1155LazyMintTransferProxy = await ethers.getContractFactory("ERC1155LazyMintTransferProxy");
    ERC721Rarible = await ethers.getContractFactory("ERC721Rarible");
    ERC721RaribleMinimal = await ethers.getContractFactory("ERC721RaribleMinimal");
    ERC1155Rarible = await ethers.getContractFactory("ERC1155Rarible");
    RoyaltiesRegistry = await ethers.getContractFactory("RoyaltiesRegistry");
    ExchangeV2 = await ethers.getContractFactory("ExchangeV2");
    ERC721RaribleFactoryC2 = await ethers.getContractFactory(
      "@rarible/tokens/contracts/create-2/ERC721RaribleFactoryC2.sol:ERC721RaribleFactoryC2"
    );
    ERC721RaribleBeacon = await ethers.getContractFactory("ERC721RaribleBeacon");
    ERC1155RaribleBeacon = await ethers.getContractFactory("ERC1155RaribleBeacon");
    ERC1155RaribleFactoryC2 = await ethers.getContractFactory("ERC1155RaribleFactoryC2");
    BeaconProxy = await ethers.getContractFactory("BeaconProxy");

    transferProxy = await upgrades.deployProxy(TransferProxy, [], {
      initializer: "__TransferProxy_init",
    });
    await transferProxy.deployed();

    // console.log(transferProxy.address, " NFT Transfer Proxy (for Approvals) (proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(transferProxy.address),
    //   " NFT Transfer Proxy (for Approvals)  implementation address"
    // );
    // console.log(
    //   await upgrades.erc1967.getAdminAddress(transferProxy.address),
    //   " NFT Transfer Proxy (for Approvals)  admin address\n"
    // );

    erc20TransferProxy = await upgrades.deployProxy(ERC20TransferProxy, [], {
      initializer: "__ERC20TransferProxy_init",
    });
    await erc20TransferProxy.deployed();

    // console.log(erc20TransferProxy.address, " erc20TransferProxy (proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(erc20TransferProxy.address),
    //   " erc20TransferProxy  implementation address"
    // );
    // console.log(
    //   await upgrades.erc1967.getAdminAddress(erc20TransferProxy.address),
    //   " erc20TransferProxy  admin address\n"
    // );

    lazyTransferProxy721 = await upgrades.deployProxy(ERC721LazyMintTransferProxy, [], {
      initializer: "__OperatorRole_init",
    });
    await lazyTransferProxy721.deployed();

    // console.log(lazyTransferProxy721.address, " lazyTransferProxy721 (proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(lazyTransferProxy721.address),
    //   " lazyTransferProxy721  implementation address"
    // );
    // console.log(
    //   await upgrades.erc1967.getAdminAddress(lazyTransferProxy721.address),
    //   " lazyTransferProxy721  admin address\n"
    // );

    lazyTransferProxy1155 = await upgrades.deployProxy(ERC1155LazyMintTransferProxy, [], {
      initializer: "__OperatorRole_init",
    });
    await lazyTransferProxy1155.deployed();

    // console.log(lazyTransferProxy1155.address, " lazyTransferProxy1155 (proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(lazyTransferProxy1155.address),
    //   " lazyTransferProxy1155  implementation address"
    // );
    // console.log(
    //   await upgrades.erc1967.getAdminAddress(lazyTransferProxy1155.address),
    //   " lazyTransferProxy1155  admin address\n"
    // );

    royaltiesRegistry = await upgrades.deployProxy(RoyaltiesRegistry, [], {
      initializer: "__RoyaltiesRegistry_init",
    });
    await royaltiesRegistry.deployed();

    // console.log(royaltiesRegistry.address, " royaltiesRegistry(proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(royaltiesRegistry.address),
    //   " royaltiesRegistry implementation address"
    // );
    // console.log(
    //   await upgrades.erc1967.getAdminAddress(royaltiesRegistry.address),
    //   " royaltiesRegistry admin address\n"
    // );

    erc721rarible = await upgrades.deployProxy(
      ERC721Rarible,
      [
        "FreeMintableRarible",
        "RARI",
        "https://ipfs.rarible.com",
        "https://ipfs.rarible.com",
        transferProxy.address,
        lazyTransferProxy721.address,
      ],
      {
        initializer: "__ERC721Rarible_init",
      }
    );

    await erc721rarible.deployed();


    // erc721raribleMinimal = await upgrades.deployProxy(
    //   ERC721RaribleMinimal,
    //   [
    //     "FreeMintableRarible",
    //     "RARI",
    //     "https://ipfs.rarible.com",
    //     "https://ipfs.rarible.com",
    //     transferProxy.address,
    //     lazyTransferProxy721.address,
    //   ],
    //   {
    //     initializer: "__ERC721Rarible_init",
    //   }
    // );

    // await erc721raribleMinimal.deployed();

    // console.log(erc721rarible.address, " erc721rarible(proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(erc721rarible.address),
    //   " erc721rarible implementation address"
    // );
    // console.log(await upgrades.erc1967.getAdminAddress(erc721rarible.address), " erc721rarible admin address\n");

    erc721RaribleBeacon = await ERC721RaribleBeacon.deploy(erc721rarible.address);
    await erc721RaribleBeacon.deployed();

    // console.log(erc721RaribleBeacon.address, "ERC721Beacon contract deployed \n");

    erc721raribleFactoryC2 = await ERC721RaribleFactoryC2.deploy(
      erc721RaribleBeacon.address,
      transferProxy.address,
      lazyTransferProxy721.address
    );
    await erc721raribleFactoryC2.deployed();

    // console.log(erc721raribleFactoryC2.address, "ERC-721 Token Factory contract deployed \n");

    erc1155rarible = await upgrades.deployProxy(
      ERC1155Rarible,
      ["FreeMintable", "TST", "ipfs:/", "ipfs:/", transferProxy.address, lazyTransferProxy1155.address],
      {
        initializer: "__ERC1155Rarible_init",
      }
    );

    await erc1155rarible.deployed();

    // console.log(erc1155rarible.address, " erc1155rarible(proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(erc1155rarible.address),
    //   " erc1155rarible implementation address"
    // );
    // console.log(await upgrades.erc1967.getAdminAddress(erc1155rarible.address), " erc1155rarible admin address\n");

    erc1155RaribleBeacon = await ERC1155RaribleBeacon.deploy(erc1155rarible.address);
    await erc1155RaribleBeacon.deployed();

    // console.log(erc1155RaribleBeacon.address, "ERC1155Beacon contract deployed \n");

    erc1155raribleFactoryC2 = await ERC1155RaribleFactoryC2.deploy(
      erc1155RaribleBeacon.address,
      transferProxy.address,
      lazyTransferProxy1155.address
    );
    await erc1155raribleFactoryC2.deployed();

    // console.log(erc1155raribleFactoryC2.address, "ERC-1155 Token Factory contract deployed \n");

    exchangeV2 = await upgrades.deployProxy(
      ExchangeV2,
      [
        transferProxy.address,
        erc20TransferProxy.address,
        parseInt(NEW_PROTOCOL_FEE),
        NEW_DEFAULT_FEE_RECEIVER,
        royaltiesRegistry.address,
      ],
      {
        initializer: "__ExchangeV2_init",
      }
    );
    await exchangeV2.deployed();

    await transferProxy.addOperator(exchangeV2.address);
    await erc20TransferProxy.addOperator(exchangeV2.address);
    await lazyTransferProxy721.addOperator(exchangeV2.address);
    await lazyTransferProxy1155.addOperator(exchangeV2.address);
    // console.log(exchangeV2.address, " exchangeV2(proxy) address");
    // console.log(
    //   await upgrades.erc1967.getImplementationAddress(exchangeV2.address),
    //   " exchangeV2 implementation address"
    // );
    // console.log(await upgrades.erc1967.getAdminAddress(exchangeV2.address), " exchangeV2 admin address\n");
  });

  // Test case
  it("test erc721Factory success!.", async function () {
    const beaconProxy = await erc721raribleFactoryC2["createToken(string,string,string,string,address[],uint256)"](
      "name",
      "symbol2",
      "https://ipfs.rarible.com",
      "https://ipfs.rarible.com",
      [],
      BigNumber.from("07135906032524143028859511501275243280740589964846816129935550266489157574612")
    );
    const receive = await beaconProxy.wait();
    const e = receive.events.find((item) => item.event === "Create721RaribleUserProxy");

    // const collection = await BeaconProxy.attach(e.args["proxy"]);
    const collection = await ERC721RaribleMinimal.attach(e.args["proxy"]);

    console.log("@@ collection @@", collection, e.args["proxy"]);

    // const mintTx = await collection.mintAndTransfer(
    //   {
    //     tokenId: BigNumber.from("0xD06e027d64CF2a1557B0c79109C60a85d1d32Cc7")
    //       .mul(BigNumber.from(2).pow(96))
    //       .add(BigNumber.from(Math.round(Math.random() * 100000)))
    //       .toString(),
    //     tokenURI: `/ipfs/loremipsum`,
    //     creators: [
    //       {
    //         account: "0xD06e027d64CF2a1557B0c79109C60a85d1d32Cc7",
    //         value: 10000,
    //       },
    //     ],
    //     royalties: [
    //       {
    //         account: "0xD06e027d64CF2a1557B0c79109C60a85d1d32Cc7",
    //         value: BigNumber.from(100).mul(BigNumber.from(50)),
    //       },
    //     ],
    //     signatures: [
    //       "0x28f013b3ce87733e8b6c214b67fd65d9d65ac008451ad4a6772faab048cab14a3c1615514d32bb2869b1aabca34752da87796ffb4f30eb8facd8782241c3344e1c",
    //     ],
    //   },
    //   "0xD06e027d64CF2a1557B0c79109C60a85d1d32Cc7"
    // );

    // const itemMint = await mintTx.wait();
    // console.log("== itemMint ==", itemMint);
    // const name = await collection.implementation();
    // const result = await name.wait();
    // console.log("== name ==", name);
  });
});

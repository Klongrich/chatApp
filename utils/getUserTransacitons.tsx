import React from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = process.env.ALCHEMY_API_KEY;

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

async function getNonUserAddress(to : string, from : string, userAddress : String) {
    if (to == userAddress) {
        return (from);
    } else {
        return (to);
    }
}

async function parseUserTransfers(payload : any, userAddress : String) {

    let target = [{
        blocknumber : "",
        address : ""
    }];

    // Limit to most recent transactions
    if(payload.length > 20) {
        for (let x = 0; x < 20; x++) {
            let _temp = {
                blocknumber : payload[x].blockNum,
                address : await getNonUserAddress(payload[x].to, payload[x].from, userAddress)
            }
            target.push(_temp);
        }
    } else {
        for (let i = 0; i < payload.length; i++) {
            let _temp = {
                blocknumber : payload[i].blockNum,
                address : await getNonUserAddress(payload[i].to, payload[i].from, userAddress)
            }
            target.push(_temp);
        }
    }
    return(target);
}

export async function GetUserTransactions(address : string){

    const data : any = await web3.alchemy.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
    })

    let TxsData = await parseUserTransfers(data.transfers, address);

    return (TxsData);
}

import { getERC20TokenName } from "../../utils/eth/getERC20TokenName";
import { getERC20TokenBalance } from "../../utils/eth/getERC20TokenBalance";

export async function getERC20TokenMeta(address : string) {
    let erc20Addresses : string[] = [];

    let erc20apiURL = "https://api.etherscan.io/api?module=account&action=tokentx&address=" + address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + process.env.ETHERSCAN_API_KEY;

    await fetch(erc20apiURL)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let txsMeta = data.result;

            for (let x = 0; x < txsMeta.length; x++) {
                let _fromAddress = txsMeta[x].from;
                let _toAddress = txsMeta[x].to;

                if (address.toLowerCase() != _fromAddress.toLowerCase()) {
                    console.log(_fromAddress);
                    erc20Addresses.push(_fromAddress);
                } else {
                    console.log(_toAddress);
                    erc20Addresses.push(_toAddress);
                }
            }
        })

    erc20Addresses = await erc20Addresses.filter((c, index) => {
        return (erc20Addresses.indexOf(c) === index);
    })

    console.log(erc20Addresses);

    let userERC20TokenMeta : any = [];

    for (let x = 0; x < erc20Addresses.length; x++) {
        let tokenAmount = await getERC20TokenBalance(address, erc20Addresses[x]);

        if (tokenAmount != undefined) {
            let tokenName = await getERC20TokenName(address, erc20Addresses[x]);

            console.log("Token  Name: " + tokenName);
            console.log("Token Amount: " + tokenAmount / 1000000000000000000);

            if (tokenAmount > 0) {
                let _dataObject = {
                    tokenName : tokenName,
                    amount : (tokenAmount / 1000000000000000000).toFixed(2)
                }
                console.log(_dataObject);
                userERC20TokenMeta.push(_dataObject);
            }
        }
    }

   // console.log(userERC20TokenMeta);
    return (userERC20TokenMeta);
}
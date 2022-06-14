import { AbiItem } from 'web3-utils';
import { ERC_20_ABI}  from "../../static/ERC20ABI";
import { web3 } from "../../static/InfuraProvider";

export async function getERC20TokenName(publicKey : string, tokenAddy : string) {
    const contract = await new web3.eth.Contract(ERC_20_ABI as AbiItem[], tokenAddy);

    let tokenName : any;

    try {
        await contract.methods.name().call(function(error : any, result : any) {
            console.log("Name: " + result);
            tokenName = result;
        });
    } catch (error) {
        console.log("Invalid Web3 API Query - name()");
    }

    return (tokenName);
}
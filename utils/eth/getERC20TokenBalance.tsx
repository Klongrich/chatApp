import { AbiItem } from 'web3-utils';
import { ERC_20_ABI}  from "../../static/ERC20ABI";
import { web3 } from "../../static/InfuraProvider";

export async function getERC20TokenBalance(publicKey : string, tokenAddy : string){
    const contract = await new web3.eth.Contract(ERC_20_ABI as AbiItem[], tokenAddy);

    let userBalance : any;

    try {
        await contract.methods.balanceOf(publicKey).call(function(error : any, result : any){
            console.log(result);
            userBalance = result;
        });
    } catch (error) {
        console.log("Invalid Web3 API Query - balanceOf()");
    }

    return (userBalance);
}
import { _pullERC20TokenMeta } from "./_pullERC20TokenMeta";
import { _pullERC721TokenMeta } from "./_pullERC721TokenMeta";

export async function _pullUserTokenMeta(address : string, setState : any, setProgress : any) {

    setState("Fetching NFT data");
    setProgress(10);
    let userERC721meta = await _pullERC721TokenMeta(address, setState, setProgress);
    setState("NFT Data Found!");
    setProgress(60);

    
    let _key721 = address + "userERC721meta";
    let _data721 = JSON.stringify(userERC721meta);

    await localStorage.setItem(_key721, _data721);

    let userERC20meta = await _pullERC20TokenMeta(address, setState, setProgress);


    let _key20 = address + "userERC20meta";
    let _data20 = JSON.stringify(userERC20meta);

    await localStorage.setItem(_key20, _data20);
    return(true);
}
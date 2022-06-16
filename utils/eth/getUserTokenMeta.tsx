import { getERC20TokenMeta } from "./getERC20TokenMeta";
import { getERC721TokenMeta } from "./getERC721TokenMeta";

export async function GetUserTokenMeta(
    address : string,
    setUserERC20 : any,
    setUserERC721 : any,
    setERC20IsLoaded : any,
    setERC721IsLoaded : any
    )
    {
        let userERC721meta = await getERC721TokenMeta(address);
        setUserERC721(userERC721meta);
        setERC721IsLoaded(true);

        let _key721 = address + "userERC721meta";
        let _data721 = JSON.stringify(userERC721meta);

        await localStorage.setItem(_key721, _data721);

        console.log("---ERC 721 updated String ERC 20---")

        let userERC20meta = await getERC20TokenMeta(address);
        setUserERC20(userERC20meta);
        setERC20IsLoaded(true);

        let _key20 = address + "userERC20meta";
        let _data20 = JSON.stringify(userERC20meta);

        await localStorage.setItem(_key20, _data20);

        console.log("----Printing Meta----");
        console.log(userERC20meta);
        console.log(userERC721meta);
    }


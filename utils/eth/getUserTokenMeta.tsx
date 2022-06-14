import { getERC20TokenMeta } from "./getERC20TokenMeta";
import { getERC721TokenMeta } from "./getERC721TokenMeta";

export async function GetUserTokenMeta(
address : string,
)
{
    let userERC721meta = await getERC721TokenMeta(address);
    let userERC20meta = await getERC20TokenMeta(address);
    let allUserMeta = await userERC20meta.concat(userERC721meta);

    return (allUserMeta);
}

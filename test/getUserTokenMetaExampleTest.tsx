
import { GetUserTokenMeta } from "../utils/eth/getUserTokenMeta";

export async function ExampleTest() {
    let metaData = await GetUserTokenMeta("0x5cbd390539caaa24152d62003de2522565470152")

    console.log("----Printing User MetaData----")
    console.log(metaData);
}


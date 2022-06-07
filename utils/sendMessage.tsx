import { writeData } from "./writeData";

import { updateCurrentMessageTo } from "./updateCurrentMessageTo";
import { updateCurrentMessageFrom } from "./updateCurrentMessageFrom";

export async function SendMessage(
    fromAddress : any,
    toAddress : any,
    message : any,
    updateToChatRoom : any,
    setNewMessage : any,
    setMessage : any,
)
{
    setMessage(" ");

    console.log("Hello");
    console.log(message);
    console.log(toAddress);
    console.log(fromAddress);

    if (!toAddress) {
        alert("Can't have Recicepnt Blak");
        return ;
    }

    //Add Checks here to see if there messages sends successfully or not.
    await writeData(fromAddress, toAddress, message);

    await updateCurrentMessageTo(fromAddress, toAddress, message);
    await updateCurrentMessageFrom(fromAddress, toAddress, message);

    if (updateToChatRoom != null && setNewMessage != null) {
        updateToChatRoom(toAddress, fromAddress);
        setNewMessage(false);
    }
}
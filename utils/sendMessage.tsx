import { writeData } from "./writeData";

import { updateCurrentMessageTo } from "./updateCurrentMessageTo";
import { updateCurrentMessageFrom } from "./updateCurrentMessageFrom";

import { updateInboxTo } from "../utils/inbox/updateInboxTo";
import { updateInboxFrom } from "../utils/inbox/updateInboxFrom";

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

    if (!toAddress) {
        alert("Can't have Recicepnt Blak");
        return ;
    }

    let _toAddress = toAddress.toLowerCase();

    if (fromAddress == _toAddress) {
        alert("User Can't send messge to self");
        return ;
    }

    //Add Checks here to see if there messages sends successfully or not.
    await writeData(fromAddress, toAddress, message);

    await updateCurrentMessageTo(fromAddress, toAddress, message);
    await updateCurrentMessageFrom(fromAddress, toAddress, message);

    await updateInboxTo(fromAddress, toAddress, message);
    await updateInboxFrom(fromAddress, toAddress, message);

    if (updateToChatRoom != null && setNewMessage != null) {
        updateToChatRoom(toAddress, fromAddress);
        setNewMessage(false);
    }
}
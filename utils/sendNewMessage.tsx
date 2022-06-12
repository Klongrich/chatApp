import { SendMessage } from "./sendMessage";
import { doc, setDoc, getDoc } from "firebase/firestore/lite";

import { checkRecivingInbox } from "../utils/inbox/checkRecivingInbox";
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";

export async function SendNewMessage(
    userAddress : any,
    toAddress : any,
    message : any,
    updateToChatRoom : any,
    setNewMessage : any,
    setMessage : any,
    db : any
)
{
    const docRef = doc(db, userAddress, "Inbox");
    const docSnap = await getDoc(docRef);

    let free = -1;

    if (docSnap.exists()) {
        let docData = docSnap.data();
        for (let e = 0; e < 11; e++) {
            if (docData[e]){
                if (docData[e] == toAddress) {
                    await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
                    return ;
                }
                if (docData[e] == "Free") {
                    free = e;
                }
            } else {
                if (free >= 0) {
                    docData[free] = toAddress;
                } else {
                    docData[e] = toAddress;
                }
                await setDoc(docRef, docData);
                await checkRecivingInbox(toAddress, userAddress, db);
                await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
                return ;
            }
        }
        alert("Your Over Your Contact Limit - Plz Remove a Contact")
    } else {
        let _data = {
            0 : toAddress
        }
        await setDoc(docRef, _data);
        await checkRecivingInbox(toAddress, userAddress, db);
        await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
    }
}
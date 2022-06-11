import { SendMessage } from "./sendMessage";
import { doc, setDoc, getDoc } from "firebase/firestore/lite";

import { checkRecivingInbox } from "../utils/inbox/checkRecivingInbox";

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

    if (docSnap.exists()) {
        let docData = docSnap.data();

        if (docData[0]) {
            console.log(docData[0]);
            if(docData[0] == toAddress) {
                console.log("Address Already Found (0) - Send Message!");
                await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
                return ;
            }
        }

        if (docData[1]) {
            console.log(docData[1]);
            if(docData[1] == toAddress) {
                console.log("Address Already Found (1) - Send Message!");
                await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
                return ;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[2]) {
            console.log(docData[2]);
            if(docData[2] == toAddress) {
                console.log("Address Already Found (2) - Send Message!");
                await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
                return ;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[3]) {
            console.log(docData[3]);
            if(docData[3] == toAddress) {
                console.log("Address Already Found (3) - Send Message!");
                return ;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[4]) {
            console.log(docData[4]);
            if(docData[4] == toAddress) {
                console.log("Address Already Found (4) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[5]) {
            console.log(docData[5]);
            if(docData[5] == toAddress) {
                console.log("Address Already Found (5) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[6]) {
            console.log(docData[6]);
            if(docData[6] == toAddress) {
                console.log("Address Already Found (6) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[7]) {
            console.log(docData[7]);
            if(docData[7] == toAddress) {
                console.log("Address Already Found (7) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : docData[6],
                "7" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[8]) {
            console.log(docData[8]);
            if(docData[8] == toAddress) {
                console.log("Address Already Found (8) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : docData[6],
                "7" : docData[7],
                "8" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }


        if (docData[9]) {
            console.log(docData[9]);
            if(docData[9] == toAddress) {
                console.log("Address Already Found (9) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : docData[6],
                "7" : docData[7],
                "8" : docData[8],
                "9" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[10]) {
            console.log(docData[10]);
            if(docData[10] == toAddress) {
                console.log("Address Already Found (10) - Send Message!");
                return;
            }
        } else {
            console.log("Address not found");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : docData[6],
                "7" : docData[7],
                "8" : docData[8],
                "9" : docData[9],
                "10" : toAddress
            }
            await setDoc(docRef, _xyzdata);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
            return ;
        }

        if (docData[11]) {
            alert("User Contact List is Full")
            console.log("User Contact List is Full!");
            return ;
        }

        } else {
            console.log("First Message Sent or Recived from this Account!");
            let _data = {
                0 : toAddress
            }
            await setDoc(docRef, _data);
            await checkRecivingInbox(toAddress, userAddress, db);
            await SendMessage(userAddress, toAddress, message, updateToChatRoom, setNewMessage, setMessage);
        }
}
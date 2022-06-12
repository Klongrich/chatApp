
import { ref, onValue, getDatabase, get, child, set } from "firebase/database";

import { doc, getDoc } from "firebase/firestore/lite";

async function getMessage(from : string, to : string) : Promise<string | undefined> {
    const dbRef = ref(getDatabase());

    let message : string;

    message = "";

    await get(child(dbRef, `messages/` + from.toLowerCase() + '/Inbox/' + to.toLowerCase() + '/message' )).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            message = data.message;
          } else {
            console.log("No data available");
          }
    }).catch((error) => {
        console.error(error);
    });

    return (message);
}

async function getTime(from : string, to : string) : Promise<number | undefined> {
    const dbRef = ref(getDatabase());

    let time : number;

    time = 0;

    // console.log("to: " + to.toLowerCase());
    // console.log("from: " + from.toLowerCase())

    await get(child(dbRef, `messages/` + from.toLowerCase() + '/Inbox/' + to.toLowerCase() + '/time' )).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            time = data.time;
          } else {
            console.log("No data available");
          }
    }).catch((error) => {
        console.error(error);
    });

    return (time);
}

async function getInboxMessage(from : string, to : string) {
    let timeX;
    let timeY;

    let message : string | undefined;
    let time;

    message = "";

    timeX = await getTime(from, to);
    timeY = await getTime(to, from);

   if (timeX != undefined && timeY != undefined) {
       if (timeX > timeY) {
            message = await getMessage(from, to);
            time = await getTime(from, to);
       } else {
            message = await getMessage(to, from);
            time = await getTime(to, from);
       }
   }

    let _messageObject = {
        from : to,
        message : message,
        time : time,
        alias : ""
    }

    return (_messageObject);
}
interface MessageObject {
    from : string;
    message : string | undefined;
    time : number | string | undefined;
    alias: string;
}

export async function checkUserInboxDB(userAddress : string, db : any) {
    const docRef = doc(db, userAddress, "Inbox");
    const docSnap = await getDoc(docRef);

    let userMessages : MessageObject[];
    userMessages =[{from : "", message: "", time : 0, alias : ""}];

    if (docSnap.exists()) {
        let docData = docSnap.data();

        if (docData[0]) {
            let messageObject = await getInboxMessage(userAddress, docData[0]);
            userMessages.push(messageObject);
        }

        if (docData[1]) {
            let messabeObject2 = await getInboxMessage(userAddress, docData[1]);
            userMessages.push(messabeObject2);
        }

        if (docData[2]) {
            let messageObject3 = await getInboxMessage(userAddress, docData[2]);
            userMessages.push(messageObject3);
        }

        if (docData[3]) {
            let messageObject4 = await getInboxMessage(userAddress, docData[3]);
            userMessages.push(messageObject4);
        }

        if (docData[4]) {
            let messageObject5 = await getInboxMessage(userAddress, docData[4]);
            userMessages.push(messageObject5);
        }

        if (docData[5]) {
            let messageObject6 = await getInboxMessage(userAddress, docData[5]);
            userMessages.push(messageObject6);
        }

        if (docData[6]) {
            let messageObject7 = await getInboxMessage(userAddress, docData[6]);
            userMessages.push(messageObject7);
        }

        if (docData[7]) {
            let messageObject8 = await getInboxMessage(userAddress, docData[7]);
            userMessages.push(messageObject8);
        }

        if (docData[8]) {
            let messageObject9 = await getInboxMessage(userAddress, docData[8]);
            userMessages.push(messageObject9);
        }

        if (docData[9]) {
            let messageObject10 = await getInboxMessage(userAddress, docData[8]);
            userMessages.push(messageObject10);
        }

    } else {
        console.log("No such document!");
    }

    let res = await userMessages.sort((t1 : any, t2 : any) => t2.time - t1.time);

    for (let x = 0; x < res.length; x++) {
        let key = res[x].from + userAddress + "alias";
        let alias = await localStorage.getItem(key);
        if (alias) {
            res[x].alias = alias;
        } else {
            //Add function to call firestore databse to check contact info for saved Alias.
            //ONLY if the user is loggin on from a different broswer.
        }
    }

    res = await res.filter(data => data.from != '');

    await localStorage.setItem("Inbox", JSON.stringify(res));
    return (res);
}





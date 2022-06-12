import { doc, setDoc, getDoc } from "firebase/firestore/lite";


export async function checkRecivingInbox(toAddress : string, fromAddress : string, db : any) {

    console.log("--Checking Reciving Inbox--");
    console.log(toAddress);

    let __from = fromAddress.toLowerCase();

    const docRef = doc(db, toAddress, "Inbox");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let docData = docSnap.data();

        console.log('---DocDat---');
        console.log(docData);

        if (docData[0]) {
            console.log(docData[0]);
            if(docData[0] == fromAddress) {
                console.log("Address Already Found (0) - Recived Inbox!");
                return ;
            }

            if (docData[0] == "Free") {
                console.log("Free Slot Found! (2) Updating contact llist");
                docData[0] = fromAddress;
                await setDoc(docRef, docData);
                return;
            }
        }

        if (docData[1]) {
            console.log(docData[1]);
            if(docData[1] == fromAddress) {
                console.log("Address Already Found (1) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Inbox");
            let _xyzdata = {
                "0" : docData[0],
                "1" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[2]) {
            console.log(docData[2]);
            if(docData[2] == fromAddress) {
                console.log("Address Already Found (2) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[3]) {
            console.log(docData[3]);
            if(docData[3] == fromAddress) {
                console.log("Address Already Found (3) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[4]) {
            console.log(docData[4]);
            if(docData[4] == fromAddress) {
                console.log("Address Already Found (4) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[5]) {
            console.log(docData[5]);
            if(docData[3] == fromAddress) {
                console.log("Address Already Found (5) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[6]) {
            console.log(docData[6]);
            if(docData[6] == fromAddress) {
                console.log("Address Already Found (6) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[7]) {
            console.log(docData[7]);
            if(docData[7] == fromAddress) {
                console.log("Address Already Found (7) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : docData[6],
                "7" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[8]) {
            console.log(docData[8]);
            if(docData[6] == fromAddress) {
                console.log("Address Already Found (8) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
            let _xyzdata = {
                "0" : docData[0],
                "1" : docData[1],
                "2" : docData[2],
                "3" : docData[3],
                "4" : docData[4],
                "5" : docData[5],
                "6" : docData[6],
                "7" : docData[7],
                "8" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[9]) {
            console.log(docData[9]);
            if(docData[9] == fromAddress) {
                console.log("Address Already Found (9) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
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
                "9" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

        if (docData[10]) {
            console.log(docData[10]);
            if(docData[10] == fromAddress) {
                console.log("Address Already Found (10) - Recived Inbox!");
                return ;
            }
        } else {
            console.log("Address not found - updating Reciving Messages");
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
                "10" : __from
            }
            await setDoc(docRef, _xyzdata);
            return ;
        }

    if (docData[11]) {
        alert("User contact list is Full");
        console.log("Reciving Users Contact List is Full!");
        return ;
    }

    } else {
        console.log("No Contact List Found by Reciving User!");
        let _data = {
            0 : __from
        }
        await setDoc(docRef, _data);
    }
}
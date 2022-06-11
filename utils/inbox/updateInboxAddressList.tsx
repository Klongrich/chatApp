import { doc, setDoc, getDoc } from "firebase/firestore/lite";

export async function updateInboxAddressList(userAddress : string, fromAddress : string, db : any) {
        const docRef = doc(db, userAddress , "Inbox");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let docData = docSnap.data();

            console.log("--Found Doc Data--");
            console.log(docData);
        } else {
            const docContactData = {
                0 : fromAddress
            };
            await setDoc(doc(db, userAddress, "Inbox"), docContactData);
        }
}
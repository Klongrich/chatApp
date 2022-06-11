import { getDatabase, ref, set} from "firebase/database";


async function setUpdateInboxFromMessage(message : string, toAddress : string, userAddress: string) {
    const database = getDatabase();
    await set(ref(database, 'messages/' + userAddress.toLowerCase() + '/Inbox/'+ toAddress.toLowerCase() + '/message'), {
        message
      });
}

async function setUpdateInboxFromFrom(toAddress : string, userAddress: string) {
    const database = getDatabase();
    set(ref(database, 'messages/' + userAddress.toLowerCase() + '/Inbox/'+ toAddress.toLowerCase() + '/from'), {
        userAddress
      });
}

async function setUpdateInboxFromTime(toAddress : string, userAddress: string, time : any) {
    const database = getDatabase();
    set(ref(database, 'messages/' + userAddress.toLowerCase() + '/Inbox/'+ toAddress.toLowerCase() + '/time'), {
        time
      });
}

async function setUpdateInboxFromTo(toAddress : string, userAddress: string) {
    const database = getDatabase();
    set(ref(database, 'messages/' + userAddress.toLowerCase() + '/Inbox/'+ toAddress.toLowerCase() + '/to'), {
        toAddress
      });
}

export async function updateInboxFrom(userAddress : string, toAddress : string, message : string) {
    const currentTime = await new Date().getTime()

    await setUpdateInboxFromMessage(message, toAddress, userAddress);
    await setUpdateInboxFromFrom(toAddress, userAddress);
    await setUpdateInboxFromTime(toAddress, userAddress, currentTime);
    await setUpdateInboxFromTo(toAddress, userAddress);
  }
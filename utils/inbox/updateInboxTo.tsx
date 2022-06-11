import { getDatabase, ref, set} from "firebase/database";


async function setUpdateInboxToMessage(message : string, toAddress : string, userAddress: string) {
    const database = getDatabase();
    await set(ref(database, 'messages/' + toAddress.toLowerCase() + '/Inbox/'+ userAddress.toLowerCase() + '/message'), {
        message
      });
}

async function setUpdateInboxToFrom(toAddress : string, userAddress: string) {
    const database = getDatabase();
    set(ref(database, 'messages/' + toAddress.toLowerCase() + '/Inbox/'+ userAddress.toLowerCase() + '/from'), {
        userAddress
      });
}

async function setUpdateInboxToTime(toAddress : string, userAddress: string, time : any) {
    const database = getDatabase();
    set(ref(database, 'messages/' + toAddress.toLowerCase() + '/Inbox/'+ userAddress.toLowerCase() + '/time'), {
        time
      });
}

async function setUpdateInboxToTo(toAddress : string, userAddress: string) {
    const database = getDatabase();
    set(ref(database, 'messages/' + toAddress.toLowerCase() + '/Inbox/'+ userAddress.toLowerCase() + '/to'), {
        toAddress
      });
}

export async function updateInboxTo(userAddress : string, toAddress : string, message : string) {
    const currentTime = await new Date().getTime()

    await setUpdateInboxToMessage(message, toAddress, userAddress);
    await setUpdateInboxToFrom(toAddress, userAddress);
    await setUpdateInboxToTime(toAddress, userAddress, currentTime);
    await setUpdateInboxToTo(toAddress, userAddress);
  }
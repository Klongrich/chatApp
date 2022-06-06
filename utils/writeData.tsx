import { getDatabase, ref, set} from "firebase/database";

export async function writeData(userAddress : string, toAddress : string, message : string) {
    const database = getDatabase();
    const currentTime = await new Date().getTime()

    set(ref(database, 'messages/' + toAddress.toLowerCase() + '/unread/'+ userAddress.toLowerCase() + '/' + currentTime.toString()), {
      From: userAddress,
      Time: currentTime.toString(),
      Message: message
    });
  }

  export async function writeDataHotFix(userAddress : string, toAddress : string, message : string) {
    const database = getDatabase();
    const currentTime = await new Date().getTime();

    await set(ref(database, 'sent/' + userAddress.toLowerCase() + '/messages/'+ toAddress.toLowerCase() + '/' + currentTime.toString()), {
      From: toAddress,
      Time: currentTime.toString(),
      Message: message
    });
  }
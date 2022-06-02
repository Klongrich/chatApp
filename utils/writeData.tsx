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
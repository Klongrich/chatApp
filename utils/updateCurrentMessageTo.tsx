import { getDatabase, ref, set} from "firebase/database";

export async function updateCurrentMessageTo(userAddress : string, toAddress : string, message : string) {
    const database = getDatabase();
    const currentTime = await new Date().getTime()

    set(ref(database, 'messages/' + toAddress.toLowerCase() + '/current/'+ userAddress.toLowerCase()), {
      From: userAddress,
      Time: currentTime.toString(),
      Message: message
    });
  }
import { getDatabase, ref, set} from "firebase/database";

export async function updateCurrentMessageFrom(userAddress : string, toAddress : string, message : string) {
    const database = getDatabase();
    const currentTime = await new Date().getTime()

    set(ref(database, 'messages/' + userAddress.toLowerCase() + '/current/'+ toAddress.toLowerCase()), {
      From: userAddress,
      Time: currentTime.toString(),
      Message: message
    });
  }
import { getDatabase, ref, set} from "firebase/database";

export async function writeData(userAddress : string, toAddress : string, message : string) {
    const database = getDatabase();
    const currentTime = await new Date().getTime()

    set(ref(database, 'messages/' + toAddress + '/unread/'+ userAddress+ '/' + currentTime.toString()), {
      From: userAddress,
      Time: currentTime.toString(),
      Message: message
    });

    console.log("set")
  }
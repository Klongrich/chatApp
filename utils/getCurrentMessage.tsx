import { getDatabase, ref, get, child} from "firebase/database";

export async function GetCurrentMessage(fromAddress : string, toAddress : string){
    const dbRef = ref(getDatabase());

    let currentMessage;

    console.log(toAddress);
    console.log(fromAddress);

    await get(child(dbRef, `messages/` + fromAddress + `/current/` + toAddress.toLowerCase())).then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        currentMessage = data;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return (currentMessage);
  }
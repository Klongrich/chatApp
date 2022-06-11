
import { getDatabase, ref, get, child} from "firebase/database";

export async function getInboxMessages(fromAddress : string) {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `messages/` + fromAddress + `/Inbox`)).then((snapshot) => {
      if (snapshot.exists()) {
        let data = JSON.stringify(snapshot.val());

        let _parse = JSON.parse(data);

        console.log("--Inbox Data--");
        console.log(_parse.Incoming);
        

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

import { ParseInboxPayload } from "../parseInboxPayload";
import { getDatabase, ref, get, child} from "firebase/database";

export const MessagesTo = (toAddress : string, fromAddress : string, setUserMessages : any) => {
    const dbRef = ref(getDatabase());

    // console.log("TO - Before database call TO: " + toAddress.toLowerCase());
    // console.log("TO - Before database call FROM: " + fromAddress);

    if (fromAddress && toAddress) {
      get(child(dbRef, 'messages/' + toAddress.toLowerCase() + '/unread/' + fromAddress)).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          ParseInboxPayload(data, setUserMessages);
        } else {
          //@ts-ignore
          setUserMessages([{from: "", message: "", time: null}]);

          console.log(toAddress);
          console.log(fromAddress);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
}



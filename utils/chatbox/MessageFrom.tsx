import { ParseInboxPayload } from "../parseInboxPayload";
import { getDatabase, ref, get, child} from "firebase/database";

export const MessagesFrom = (toAddress : string, fromAddress : string, setUserMessages : any) => {
    const dbRef = ref(getDatabase());

    // console.log("FROM - Before database call TO: " + toAddress.toLowerCase());
    // console.log("FROM - Before database call FROM: " + fromAddress);

    get(child(dbRef, 'messages/' + fromAddress + '/unread/' + toAddress.toLowerCase())).then((snapshot) => {
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
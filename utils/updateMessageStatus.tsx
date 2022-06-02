import { getDatabase, ref, set, remove} from "firebase/database";

export async function UpdateMessageStatus(from : string, to : string | undefined, time: any, message: string) {
    const db = getDatabase();

    remove(ref(db, 'messages/' + to + '/unread/' + from + '/' + time))

    set(ref(db, 'messages/' + to + '/read/'+ from + '/' + time), {
      From: from,
      Time: time,
      Message: message
    });
  }
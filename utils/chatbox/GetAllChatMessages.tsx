import React, {useEffect} from "react";
import { getDatabase, ref, get, child} from "firebase/database";
import { sortByTime } from "../sort/sortByTime";

export async function GetAllChatMessages(toAddress : any , fromAddress : any) {
    const dbRef = ref(getDatabase());

    let currentToInbox = [{from: "", message: "", time: null}];
    let currentFromInbox = [{from: "", message: "", time: null}];
    let sortedArray = [{from: "", message: "", time: null}];

    if (fromAddress && toAddress) {
    await get(child(dbRef, 'messages/' + toAddress.toLowerCase() + '/unread/' + fromAddress.toLowerCase())).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          let _rawData = JSON.stringify(data);
          let _temp = _rawData.split("From");

          for (let i = 0; i < _temp.length; i++) {
            let _temp2 = _temp[i].split("\"");

            let _dataType = {
              from : _temp2[2],
              message : _temp2[6],
              time : parseInt(_temp2[10])
            };
            if (_temp2[10] != null && _temp2[10] != undefined) {
            //@ts-ignore
            currentToInbox.push(_dataType);
            }
          }
        } else {
          console.log("No Messages Found")
        }
      }).catch((error) => {
        console.error(error);
      });

      await get(child(dbRef, 'messages/' + fromAddress.toLowerCase() + '/unread/' + toAddress.toLowerCase())).then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();

          let _rawData = JSON.stringify(data);
          let _temp = _rawData.split("From");

          for (let i = 0; i < _temp.length; i++) {
            let _temp2 = _temp[i].split("\"");

            let _dataType = {
              from : _temp2[2],
              message : _temp2[6],
              time : parseInt(_temp2[10])
            };
            if (_temp2[10] != null && _temp2[10] != undefined) {
              //@ts-ignore
              currentFromInbox.push(_dataType);
            }
          }
        } else {
          //@ts-ignore
          console.log("No Messages Found");
        }
      }).catch((error) => {
        console.error(error);
      });

      let result = currentFromInbox.concat(currentToInbox);

      sortedArray = await sortByTime(result, "time");

      //console.log(sortedArray);

      return (sortedArray.reverse());
    }
}


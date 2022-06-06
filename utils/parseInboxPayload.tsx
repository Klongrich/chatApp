export const ParseInboxPayload = (payload : any, setUserMessages: any) => {
    let _rawData = JSON.stringify(payload);
    let _temp = _rawData.split("From");
    let currentInbox = [{from: "", message: "", time: null}];

    for (let i = 0; i < _temp.length; i++) {
      let _temp2 = _temp[i].split("\"");

      let _dataType = {
        from : _temp2[2],
        message : _temp2[6],
        time : _temp2[10]
      };
      //@ts-ignore
      currentInbox.push(_dataType);
    }
    setUserMessages(currentInbox);
  }

  export async function HomeScreenParseInboxPayload(payload : any, setUserMessages: any, userAddress : any){
    let _rawData = JSON.stringify(payload);
    let _temp = _rawData.split("From");
    let currentInbox = [{from: "", message: "", alias: "", time: null}];

    for (let i = 0; i < _temp.length; i++) {
      let _temp2 = _temp[i].split("\"");

      let _dataType = {
        from : _temp2[2],
        message : _temp2[6],
        time : parseInt(_temp2[10])
      };
      if (_temp2[10] != null && _temp2[10] != undefined) {
        //@ts-ignore
        currentInbox.push(_dataType);
      }
    }

    currentInbox = currentInbox.reverse();
    //Filtering Address
    currentInbox = currentInbox.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.from === thing.from
    )));

    for (let x = 0; x < currentInbox.length; x++) {
      let alias = await localStorage.getItem(currentInbox[x].from);

      if (alias) {
        let newParse = alias.split(":");
        currentInbox[x].alias = newParse[1].trim();
      }
    }

    setUserMessages(currentInbox);
  }
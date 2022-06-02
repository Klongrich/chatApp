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
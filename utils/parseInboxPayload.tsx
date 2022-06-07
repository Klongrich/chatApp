import { GetCurrentMessage } from "./getCurrentMessage";

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

  async function sortByTime(array : any, key : any) {
    return array.sort(function(a : any, b : any)
    {
     var x = a[key]; var y = b[key];
     return ((x < y) ? +1 : ((x > y) ? 1 : 0));
    });
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

    //Filtering Multiple Address
    currentInbox = currentInbox.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.from === thing.from
    )));

    let _testingTimeSort = await sortByTime(currentInbox, "time");

    console.log("Testin time sort in inbox");
    console.log(_testingTimeSort);


    for (let x = 0; x < _testingTimeSort.length; x++) {
      let alias = await localStorage.getItem(_testingTimeSort[x].from);

      if (_testingTimeSort[x].from) {
        let currentMessageMeta;

        currentMessageMeta = await GetCurrentMessage(userAddress, _testingTimeSort[x].from);

        if (currentMessageMeta) {
          //@ts-ignore
          _testingTimeSort[x].message = currentMessageMeta.Message;
          //@ts-ignore
          _testingTimeSort[x].time = parseInt(currentMessageMeta.Time);
        }

        if (alias) {
          let newParse = alias.split(":");
          _testingTimeSort[x].alias = newParse[1].trim();
        }
      }
    }

    let res = await _testingTimeSort.sort((t1 : any, t2 : any) => t2.time - t1.time);

    setUserMessages(res);
  }
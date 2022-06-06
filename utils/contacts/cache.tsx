import Dexie from "dexie";

var db = new Dexie("ClientInfoV2");

var ClientData = {
  publicKey: "",
  alias: ""
};

async function addData(publicKey :any, alias : any) {
//@ts-ignore
  await db.ClientInfo.add({
    publicKey: publicKey,
    alias: alias
  });
}

async function checkForUser(publicKey : any) {
//@ts-ignore
  const data = await db.ClientInfo.where({
    publicKey: publicKey
  }).first();
  return data;
}

export default async function IndexCache(publicKey : any, alias : any) {

  db.version(1).stores({
    ClientInfo: "++id, &publicKey, alias",
  });


  db.open().catch(function (err) {
    console.error(err.stack || err);
  });


  ClientData = await checkForUser(publicKey);

  if (ClientData) {
    return ClientData;
  } else {
    addData(publicKey, alias);
  }

  return null;
}
import React, {useEffect, useState} from "react";
import { cutUserAddress } from "../utils/strings/cutUserAddress";
import { Container,
         ProfilePicBox,
         ContactContaier,
         ContactsPublicKeyBox,
         SyncBox,
         SyncingBox,
         SyncedBox } from "../styles/ContactBox";

import  ContactMeta  from "../components/ContactMeta";

export const ContactBox = ({userAddress, updateToChatRoom, contactList} : any) => {

    const [displayContactMeta, setDisplayContactMeta] = useState(false);
    const [allContactsInfo, setAllContactsInfo] = useState([{}]);

    const [isSyncing, setIsSyncing] = useState(false);
    const [isSynced, setIsSynced] = useState(false);
    const [confrimingSync, setConfrimingSync] = useState(false);

    const [contactAddress, setContactAddress] = useState("");
    const [contactAlias, setContactAlias] = useState("");

    //FAKE storage call
    async function allStorage() {
        var valuesX = [],
            keys = await Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            valuesX.push(localStorage.getItem(keys[i]) );
        }
        return valuesX;
    }

    async function loadUserInfo() {
        let userCache = await allStorage();

        let cachedContent = [{
            alias : "",
            publicKey: ""
        }];

        console.log(userCache);

        for (let x = 0; x < userCache.length; x++) {
            //@ts-ignore
            if (userCache[x].includes("0x")) {
                //@ts-ignore

                console.log(userCache[x]);

                //@ts-ignore
                let _temp = userCache[x].split(":");

                if (_temp[1]) {
                    let userPublicKey = _temp[0].trim();

                    if (userPublicKey.length == 42) {
                        let _userContacts = {
                            alias : _temp[1].trim(),
                            publicKey : _temp[0].trim()
                        }
                        cachedContent.push(_userContacts);
                    }
                }
            }
        }
        setAllContactsInfo(cachedContent);
    }

    async function getSyncStatus(from : string) {
        //pull from local storage;
        let syncKey = from + userAddress + "sync";
        let status = await localStorage.getItem(syncKey);

        if (status) {
            return ("true")
        } else {
            return ("false");
        }
    }

    async function checkSyncStatus(contactList : any) {
        let _res : any = [];

        for (let x = 0; x < contactList.length; x++) {

            let _from = contactList[x].from;
            let _alias = contactList[x].alias;

            let _sync = await getSyncStatus(_from);

            console.log("---Sync Status---");
            console.log(_sync);

            if (_from && _alias) {

                let _dataObject = {
                    from : contactList[x].from,
                    alias : contactList[x].alias,
                    sync : _sync
                }
                _res.push(_dataObject);
            }
        }

        console.log(_res);
        setAllContactsInfo(_res);
    }

    useEffect(() => {
        let _tempHolder : any =  [];

        for (let x = 0; x < contactList.length; x++ ) {
            _tempHolder.push(contactList[x]);
        }

        let sortedArray = _tempHolder.sort((a : any, b : any) => (a.alias > b.alias) ? 1 : -1);
        console.log(sortedArray);

        checkSyncStatus(sortedArray);
    }, [])


    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async function syncContact(contactAddress : string) {
        console.log(contactAddress);
        setIsSyncing(true);
        await delay(2000);

        //write to cache
        let syncKey = contactAddress + userAddress + "sync";
        await localStorage.setItem(syncKey, "true");

        setIsSyncing(false);
        setIsSynced(true);
    }

    async function showContactMeta(contactAddress : string, contactAlias : string) {
        if (contactAddress) {
            setContactAddress(contactAddress);
            setContactAlias(contactAlias);
            setDisplayContactMeta(true);
        }
    }

    return(
        <>
            {displayContactMeta && <>
                <Container>
                <ContactMeta userAddress={userAddress}
                             contactAddress={contactAddress}
                             alias={contactAlias}
                             setDisplayMeta={setDisplayContactMeta}
                             setUpdateToChatRoom={updateToChatRoom}
                            />
                </Container>
            </>}

            {!displayContactMeta && <>
                <Container>
                {allContactsInfo.map((data : any) =>
                    <>
                        {data.from != "" && data.alias != "true,\"accounts\"" && data.alias != "" && <>
                        <ContactContaier onClick={() => showContactMeta(data.from, data.alias)}>
                            <ProfilePicBox />
                            <h4> <strong> {data.alias} </strong> </h4>
                            <ContactsPublicKeyBox>
                                <p> {cutUserAddress(data.from)} </p>
                            </ContactsPublicKeyBox>
                        </ContactContaier>
                        <SyncBox>
                            <h5> Sync </h5>
                        </SyncBox>
                        <br /> <br />

                        {/* {!isSynced && !isSyncing && <>
                            {confrimingSync && <>
                                <SyncBox onClick={() => syncContact(data.from)}>
                                    Confrim Sync
                                </SyncBox>

                            </>}
                            {!confrimingSync && <>
                                {data.sync == "false" && <>
                                <SyncBox onClick={() => setConfrimingSync(true)}>
                                    <h5> Sync </h5>
                                </SyncBox>
                                </>}
                                {data.sync == "true" && <>
                                    <SyncedBox>
                                        <h5> Synced </h5>
                                    </SyncedBox>
                                </>}
                            </>}
                        </>}

                        {!isSynced && isSyncing && <>
                            <SyncingBox>
                                <h5> Syncing ..... </h5>
                            </SyncingBox>
                        </>}

                        {isSynced && <>
                            <SyncedBox>
                                <h5> Synced </h5>
                            </SyncedBox>
                        </>}

                        <br /> <br /> */}

                        </>}
                    </>
                )}
                </Container>
            </>}
        </>
    )
}
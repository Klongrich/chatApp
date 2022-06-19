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
interface ContactInfo {
    alias : string;
    from : string;
    isSynced : boolean;
    isSyncing : boolean;
}

export const ContactBox = ({userAddress, updateToChatRoom, contactList} : any) => {

    const [displayContactMeta, setDisplayContactMeta] = useState<boolean>(false);
    const [allContactsInfo, setAllContactsInfo] = useState<ContactInfo [] | null>([]) ;

    const [contactAddress, setContactAddress] = useState("");
    const [contactAlias, setContactAlias] = useState("");

    async function getSyncStatus(from : string) {
        let syncKey = from + userAddress + "sync";
        let status = await localStorage.getItem(syncKey);

        if (status) {
            return (true)
        } else {
            return (false);
        }
    }

    async function syncContact(contractAddress : string) {
        let res : any = []

        if (allContactsInfo != null) {
            for (let x = 0; x < allContactsInfo.length; x++) {
                if (allContactsInfo[x].from == contractAddress) {
                    let updateSync = {
                        alias : allContactsInfo[x].alias,
                        from : allContactsInfo[x]. from,
                        isSynced : false,
                        isSyncing : true
                    }
                    res.push(updateSync);
                } else {
                    res.push(allContactsInfo[x]);
                }
            }
            setAllContactsInfo(res);
        }

        await delay(2000);

        let syncKey = contractAddress + userAddress + "sync";
        await localStorage.setItem(syncKey, "true");

        let res2 : any = [];

        if (allContactsInfo != null) {
            for (let x = 0; x < allContactsInfo.length; x++) {
                if (allContactsInfo[x].from == contractAddress) {
                    let updateSync = {
                        alias : allContactsInfo[x].alias,
                        from : allContactsInfo[x]. from,
                        isSynced : true,
                        isSyncing : true
                    }
                    res2.push(updateSync);
                } else {
                    res2.push(allContactsInfo[x]);
                }
            }
            setAllContactsInfo(res2);
        }

    }

    async function checkSyncStatus(contactList : any) {
        let _res : ContactInfo[] = [];

        for (let x = 0; x < contactList.length; x++) {

            let _from = contactList[x].from;
            let _alias = contactList[x].alias;

            let _sync = await getSyncStatus(_from);

            if (_from && _alias) {
                let _dataObject = {
                    from : contactList[x].from,
                    alias : contactList[x].alias,
                    isSynced : _sync,
                    isSyncing : false
                }
                _res.push(_dataObject);
            }
        }
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
                    {allContactsInfo != null && <>
                        {allContactsInfo.map((data : any) => <>
                            {data.from != "" && data.alias != "true,\"accounts\"" && data.alias != "" && <>
                                <ContactContaier onClick={() => showContactMeta(data.from, data.alias)}>
                                    <ProfilePicBox />
                                    <h4> <strong> {data.alias} </strong> </h4>
                                    <ContactsPublicKeyBox>
                                        <p> {cutUserAddress(data.from)} </p>
                                    </ContactsPublicKeyBox>
                                </ContactContaier>

                                {data.isSynced != true && data.isSyncing != true && <>
                                    <SyncBox onClick={() => syncContact(data.from)}>
                                        <h5> Sync </h5>
                                    </SyncBox>
                                </>}

                                {data.isSynced != true && data.isSyncing == true && <>
                                    <SyncingBox>
                                        <h5> Syncing .... </h5>
                                    </SyncingBox>
                                </>}

                                {data.isSynced && <>
                                    <SyncedBox>
                                        <h5> Synced </h5>
                                    </SyncedBox>
                                </>}

                                <br /> <br />
                            </>}
                        </>)}
                    </>}
                </Container>
            </>}
        </>
    )
}
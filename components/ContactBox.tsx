import React, {useEffect, useState} from "react";
import { cutUserAddress } from "../utils/strings/cutUserAddress";
import { Container, ProfilePicBox, ContactContaier, ContactsPublicKeyBox, SyncBox } from "../styles/ContactBox";

export const ContactBox = ({userAddress, updateToChatRoom, contactList} : any) => {

    const [newContact, setNewContact] = useState(false);
    const [allContactsInfo, setAllContactsInfo] = useState([{}]);
 
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

    useEffect(() => {
        let _tempHolder : any =  [];

        for (let x = 0; x < contactList.length; x++ ) {
            _tempHolder.push(contactList[x]);
        }

        let sortedArray = _tempHolder.sort((a : any, b : any) => (a.alias > b.alias) ? 1 : -1);
        console.log(sortedArray);
        setAllContactsInfo(sortedArray);
    }, [])

    return(
        <>
            {!newContact && <>
                <Container>
                {allContactsInfo.map((data : any) =>
                    <>
                        {data.from != "" && data.alias != "true,\"accounts\"" && data.alias != "" && <>
                        <ContactContaier onClick={() => updateToChatRoom(data.from, userAddress, data.alias)}>
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
                        </>}
                    </>
                )}
                </Container>
            </>}
        </>
    )
}
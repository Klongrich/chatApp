import React, {useEffect, useState} from "react";
import { cutUserAddress } from "../utils/strings/cutUserAddress";
import { Container, ProfilePicBox, ContactContaier, ContactsPublicKeyBox, SyncBox } from "../styles/ContactBox";

export const ContactBox = ({userAddress, updateToChatRoom} : any) => {

    const [newContact, setNewContact] = useState(false);
    const [allContactsInfo, setAllContactsInfo] = useState([{}]);

    function allStorage() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            values.push(localStorage.getItem(keys[i]) );
        }
        return values;
    }

    useEffect(() => {
        //If no storgae is returned, call databse to get contacts and set localstoage.
        //Edgecase for users having the same wallet but on a different web-broswer.
        let userCache = allStorage();

        let cachedContent = [{
            alias : "",
            publicKey: ""
        }];

        for (let x = 0; x < userCache.length; x++) {
            //@ts-ignore
            if (userCache[x].includes("0x")) {
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
    }, [])

    return(
        <>
            {!newContact && <>
                <Container>
                {allContactsInfo.map((data : any) =>
                    <>
                        {data.publicKey != "" && data.alias != "true,\"accounts\"" && <> 
                        <ContactContaier onClick={() => updateToChatRoom(data.publicKey, userAddress, data.alias)}>
                            <ProfilePicBox />
                            <h4> <strong> {data.alias} </strong> </h4>
                            <ContactsPublicKeyBox>
                                <p> {cutUserAddress(data.publicKey)} </p>
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
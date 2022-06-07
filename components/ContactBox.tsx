import React, {useEffect, useState} from "react";
import styled from "styled-components"

import { doc, setDoc, getDoc, Timestamp, getDocs, collection } from "firebase/firestore/lite";

const Container = styled.div`
    background-color: black;
    padding-top: 20px;
    color: white;
    height: 100vh;

    margin-top: -30px;
`

const ProfilePicBox = styled.div`
    border-radius: 50%;
    background-color: grey;

    height: 42px;
    width: 42px;

    margin-top: 20px;
    margin-left: 5px;
    margin-bottom: -65px;
`

const ContactContaier = styled.div`
    text-align: left;

    margin-top: -10px;

    h4 {
        padding-left: 65px;
    }

    p {
        padding-left: 65px;
        padding-right: 10px;
        margin-top: -20px;

        font-size: 12px;
        color: #a3a3a3;
    }
`

const ContactsPublicKeyBox = styled.div`
    height: 40px;
`


export const ContactBox = ({userAddress , db, updateToChatRoom} : any) => {

    const [newContact, setNewContact] = useState(false);
    const [allContactsInfo, setAllContactsInfo] = useState([{}]);

    function cutUserAddress(address : string) {
        if (address) {
            return (address.substring(0, 5) + "...." + address.substring(address.length - 5, address.length));
        } else {
            return (null);
        }
    }

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

                let _userContacts = {
                    alias : _temp[1].trim(),
                    publicKey : _temp[0].trim()
                }
                cachedContent.push(_userContacts);
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
                        </>}
                    </>
                )}
                </Container>
            </>}
        </>
    )
}
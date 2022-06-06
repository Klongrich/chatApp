import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { doc, setDoc } from "firebase/firestore/lite";

const ChatRoomBox = styled.div`
    background-color: black;
    color: white;

    height: 50px;

    width: 100%;

    h4 {
        text-align: center;
        font-size: 22px;
    }
`

const Container = styled.div`
    background-color: black;
    padding-top: 20px;
    color: white;
    height: 100vh;

    margin-top: -30px;

    h2 {
        text-align: center;
    }
`

const EnterAliasBox = styled.div`
    background-color: black;
    text-align: center;
    margin-top: 60px;
`


const InputAlias = styled.input`
 width: 90%;
 border-bottom: 1px solid #f0f0f0;
 border-top: 1px solid black;
 border-left: 1px solid black;
 border-right: 1px solid black;
 padding: 10px;
 background-color: black;
 outline-width: 0;
 color: #f0f0f0;
 font-size: 14px;
 height: 40px;
 margin-top: 5px;
`

export const NewContact = ({userAddress, contactPublicKey, db} : any) => {

    const [alias, setAlias] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [viewMore, setViewMore] = useState(false);

    async function setNewContactInformation() {
        const docContactData = {
            alias : alias,
            publicKey: contactPublicKey,
            email : "",
            phoneNumber: "",
            name: "",
        };

        await setDoc(doc(db, userAddress, contactPublicKey), docContactData);

        let stringToStore = contactPublicKey + " : " + alias;

        localStorage.setItem(contactPublicKey, stringToStore);

        let contactsRef = doc(db, "Contacts", userAddress);
        setDoc(contactsRef, { contactPublicKey : contactPublicKey}, {merge : true});
    }

    return (
        <>
            <ChatRoomBox>
               <h4> Update Contact </h4>
            </ChatRoomBox>

            <Container>
                <EnterAliasBox>
                    <h3> Enter Alias</h3>

                    <InputAlias type="text"
                            placeholder="Alais"
                            onChange={e => setAlias(e.target.value)}
                    />

                </EnterAliasBox>
                <br /> <br />
                <button onClick={() => setNewContactInformation()}>
                    Save
                </button>

            {/* <h4 onClick={() => setViewMore(!viewMore)}> View More </h4> */}

            {viewMore && <>
            <input type="text" placeholder={"Name"} />
            <br /> <br />

            <input type="text" placeholder={"Email"} />
            <br /> <br />

            <input type="text" placeholder={"Phone Number"} />
            <br /> <br />
            </>}

            </Container>
        </>
    )

}
import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { GetUnreadMessages } from "../utils/getUnreadMessages";
import { ref, onValue } from "firebase/database";

import { HomeScreenParseInboxPayload } from "../utils/parseInboxPayload"

import { ChatRoom }  from "./ChatRoom";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

const Container = styled.div`
    background-color: black;
    color: white;

    height: 100vh;
    padding-top: 20px;
    width: 100%;
    border: 1px solid black;

    margin-top: -35px;
    margin-bottom: 25px;

    overflow: auto;
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

const LatestMessageBox = styled.div`
    height: 40px;
`

const ContactBox = styled.div`
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

export const Inbox = ({userAddress, database, updateToChatRoom} : any) => {

    const [userMessages, setUserMessages] = useState([{from: "", message: "", alias: "", time: ""}]);
    const [isMessaging, setIsMessaging] = useState(false);
    const [toAddress, setToAddress] = useState("");

    function cutUserAddress(address : string) {
        if (address) {
            return (address.substring(0, 5) + "...." + address.substring(address.length - 5, address.length));
        } else {
            return (null);
        }
    }

    function checkLatestMessageLength(Message : string) {
        if (Message != undefined) {
            if (Message.length > 80) {
                return(Message.substring(0, 80) + ".......")
            } else {
                return (Message);
            }
        }
    }

    useEffect(() => {
        async function ListenForMessages() {
              const listining = ref(database, 'messages/' + userAddress + '/unread');
              onValue(listining, (snapshot) => {
                const data = snapshot.val();
                HomeScreenParseInboxPayload(data, setUserMessages, userAddress);
            });
          }
          ListenForMessages();
    }, [])

    return (
    <>
        <Container>
        {isMessaging && <>
            <ArrowBack size={25} onClick={() => setIsMessaging(!isMessaging)}/>
            <ChatRoom userAddress={userAddress}
                     toAddress={toAddress}
                     database={database}
            />
        </>}
        {!isMessaging && <>
            {userMessages.map((data) => <>
                {data.time != null && <>
                    <ContactBox onClick={() => updateToChatRoom(data.from, userAddress, data.alias)}>
                        <ProfilePicBox />

                        {data.alias && <>
                            <h4> <strong> {data.alias} </strong> </h4>
                        </>}

                        {!data.alias && <>
                            <h4> <strong> {cutUserAddress(data.from)} </strong> </h4>
                        </>}

                        <LatestMessageBox>
                            <p> {checkLatestMessageLength(data.message)} </p>
                        </LatestMessageBox>
                    </ContactBox>
                    <br /> <br />
                </>}
            </>)}
        </>}
        </Container>
    </>)
}

import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { GetUnreadMessages } from "../utils/getUnreadMessages";
import { ref, onValue } from "firebase/database";

import { HomeScreenParseInboxPayload } from "../utils/parseInboxPayload"
import { cutUserAddress } from "../utils/strings/cutUserAddress";

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
    border-radius: 100%;
    background-color: #d8d8d8;

    height: 38px;
    width: 38px;

    margin-top: 20px;
    margin-left: 5px;
    margin-bottom: -65px;
`

const LatestMessageBox = styled.div`
    height: 40px;
`

const ContactBox = styled.div`
    text-align: left;

    margin-top: -30px;
    padding-left: 10px;

    h4 {
        padding-left: 60px;
        padding-top: 2px;
        font-size: 18px;
        color: #fdfdfd;
    }

    p {
        padding-left: 60px;
        padding-right: 28px;
        margin-top: -22px;

        font-size: 12px;
        color: #a3a3a3;
    }
`

export const Inbox = ({userAddress, database, updateToChatRoom} : any) => {

    const [userMessages, setUserMessages] = useState([{from: "", message: "", alias: "", time: ""}]);
    const [isMessaging, setIsMessaging] = useState(false);
    const [toAddress, setToAddress] = useState("");


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

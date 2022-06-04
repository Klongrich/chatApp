import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { UpdateMessageStatus } from "../utils/updateMessageStatus";
import { GetReadMessages } from "../utils/getReadMessages";
import { GetUnreadMessages } from "../utils/getUnreadMessages";

import { GetAllChatMessages } from "../utils/chatbox/GetAllChatMessages";

import { ref, onValue } from "firebase/database";

import { HomeScreenParseInboxPayload } from "../utils/parseInboxPayload"

import { ChatRoom }  from "./ChatRoom";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

const Container = styled.div`
    background-color: black;
    color: white;

    height: 800px;
    padding-top: 20px;
    width: 100%;
    border: 1px solid black;

    margin-top: -35px;
    margin-bottom: 25px;

    overflow: auto;
`

const ContactBox = styled.div`
    text-align: left;
    border-top: 1px solid white;
    border-bottom: 1px solid white;

    p {
        padding-left: 10px;
        padding-right: 10px;
    }
`

export const Inbox = ({userAddress, database, updateToChatRoom} : any) => {

    const [userMessages, setUserMessages] = useState([{from: "", message: "", time: ""}]);
    const [isMessaging, setIsMessaging] = useState(false);
    const [toAddress, setToAddress] = useState("");

    function getCurrentTime(unixTimeStamp : number) {
        var date = new Date(unixTimeStamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return(formattedTime);
    }

    function getCurrentDate(unixTimeStamp : number) {
        var res = new Date(unixTimeStamp).toLocaleDateString('en-US');
        return(res);
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

    async function GetChatRoomMessageTest() {
        let Messages = await GetAllChatMessages("0x5f119A1b0A2874C8cADE0C7d96E33033FE6F1d28", "0x9c8830489E4f81B65d8c7a0A91D3C03bE24311bD");

        console.log("Messages");
        console.log(Messages);
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
          GetUnreadMessages(userAddress, setUserMessages);
    }, [])

    return (
    <>
        <Container>

        {isMessaging && <>
            <ArrowBack size={25} onClick={() => setIsMessaging(!isMessaging)}/>

            <ChatRoom userAddress={userAddress}
                     toAddress={toAddress}
                     database={database}/>
        </>}

        {!isMessaging && <>
            {userMessages.map((data) =>
            <>
                {data.time != null && <>
                    <ContactBox onClick={() => updateToChatRoom(data.from, userAddress)}>
                        <p> {data.from} </p>
                        <p> {checkLatestMessageLength(data.message)} </p>
                        {/* <p> {getCurrentDate(parseInt(data.time))} @ {getCurrentTime(parseInt(data.time))} </p> */}
                    </ContactBox>
                    <br /> <br />
                </>}
            </>
            )}
        </>}

        </Container>
    </>)
}
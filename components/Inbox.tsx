import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { UpdateMessageStatus } from "../utils/updateMessageStatus";
import { GetReadMessages } from "../utils/getReadMessages";
import { GetUnreadMessages } from "../utils/getUnreadMessages";

import { ref, onValue } from "firebase/database";

import { ParseInboxPayload } from "../utils/parseInboxPayload"

const Container = styled.div`
    background-color: purple;

    height: 500px;
    width: 100%;
    border: 1px solid black;
`

export default function Inbox({userAddress, database} : any) {

    const [userMessages, setUserMessages] = useState([{from: "", message: "", time: ""}]);

    //@ts-ignore
    useEffect(() => {
        async function ListenForMessages() {
              const listining = ref(database, 'messages/' + userAddress + '/unread');

              onValue(listining, (snapshot) => {
                const data = snapshot.val();
                ParseInboxPayload(data, setUserMessages);
            });
          }
          ListenForMessages();
    }, [])

    return (
    <>
        <Container>
            <h2> Inbox </h2>
            <button onClick={() => GetUnreadMessages(userAddress, setUserMessages)}>
                Show Unread Messages
            </button>

            <br /> <br />

            <button onClick={() => GetReadMessages(userAddress, setUserMessages)}>
                Show Read Messages
            </button>

            {userMessages.map((data) =>
            <>
                {data.time != null && <>
                    <div onClick={() => UpdateMessageStatus(data.from, userAddress, data.time, data.message)}>
                        <p> From: {data.from} </p>
                        <p> Time: {data.time} </p>
                        <p> Message: <br /> <br /> <br />{data.message} </p>
                    </div>
                    <br /> <br />
                </>}
            </>
            )}
        </Container>
    </>)
}
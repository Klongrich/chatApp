import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { UpdateMessageStatus } from "../utils/updateMessageStatus";
import { GetReadMessages } from "../utils/getReadMessages";
import { GetUnreadMessages } from "../utils/getUnreadMessages";

import { getDatabase, ref, set, onValue, get, child, remove} from "firebase/database";

import { ParseInboxPayload } from "../utils/parseInboxPayload"

const Container = styled.div`
    background-color: purple;

    height: 500px;
    width: 650px;
    border: 1px solid black;
`

export default function Inbox({userAddress, database} : any) {

    const [userMessages, setUserMessages] = useState([{from: "", message: "", time: ""}]);

    useEffect(() => {
        async function ListenForMessages() {
            console.log(userAddress);
              const listining = ref(database, 'messages/' + userAddress + '/unread');

              console.log("hello");
              onValue(listining, (snapshot) => {
                const data = snapshot.val();

                console.log("Hello again");
                console.log(data);
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
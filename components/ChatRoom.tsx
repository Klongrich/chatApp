import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import { doc, getDoc } from "firebase/firestore/lite";
import { ref, onValue } from "firebase/database";

import { GetAllChatMessages } from "../utils/chatbox/GetAllChatMessages";
import { SendPlane } from "@styled-icons/remix-fill/SendPlane";
import { writeDataHotFix } from "../utils/writeData";
import { writeData } from "../utils/writeData";

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

const ChatRoomContainer = styled.div`
    background-color: black;
    color: white;

    padding-top: 20px;
    padding-bottom: 20px;

    height: 490px;

    overflow: auto;
    bottom: 0;

`

const FromBox = styled.div`
    background-color: #4a4a4a;
    text-align: left;
    width: 50%;
    margin-left: 3%;

    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 10px;
    padding-right: 10px;

    margin-top: 15px;

    border-radius: 15px;

    font-size: 12px;

    h4 {
        font-size: 10px;
    }
`

const ToBox = styled.div`
    background-color: #03A390;
    text-align: left;
    padding-right: 10px;
    padding-left: 10px;
    width: 50%;
    margin-left: 42%;

    padding-top: 1px;
    padding-bottom: 1px;

    margin-top: 15px;

    line-height: 1.2;
    border-radius: 15px;

    font-size: 12px;

    h4 {
        font-size: 10px;
    }
`

const InputMessage = styled.textarea`
    width: 70%;
    height: 45px;

    margin-right: 40px;

    border-radius: 15px;
    color: white;
    background-color: #454545;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    font-size: 13px;
    line-height: 160%;

    outline-width: 0;
    resize: none;

    ::placeholder {
        color: #f0f0f0;
    }
`

const InputBoxContainer = styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 20px;
    color: white;
    text-align: center;
    height: 100vh;
`


const SendPlaneContainer = styled.div`
    text-align: right;
    padding-right: 32px;
    padding-top: 5px;
    margin-top: -81px;
`

export const ChatRoom = ({fromAddress, toAddress, toAlias, database, db} : any ) => {

    const [chatMessages, setChatMessages] = useState([{from: "", message: "", time: ""}]);
    const [loadedToAddress, setLoadedToAddress] = useState("");

    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    function cutUserAddress(address : string) {
        if (address.includes("0x")) {
            return (address.substring(0, 5) + "...." + address.substring(address.length - 5, address.length));
        } else if (address) {
            return (address);
        } else {
            return (null);
        }
    }


  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


    async function sendMessage() {
        setMessage(" ");
        console.log("Hello");
        console.log(message);
        console.log(toAddress);
        console.log(fromAddress);

        if (!toAddress) {
            alert("Can't have Recicepnt Blak");
            return ;
        }

        //Add Checks here to see if there messages sends successfully or not.
        await writeData(fromAddress, toAddress, message);
        await writeDataHotFix(fromAddress, toAddress, message);
    }

    useEffect(() => {
        async function ListenForFrom() {
              const listining = ref(database, 'messages/' + fromAddress.toLowerCase() + '/unread/' + toAddress.toLowerCase());

              onValue(listining, (snapshot) => {
                const data = snapshot.val();
                getMessages();
            });
          }
          ListenForFrom();
    }, [])

    useEffect(() => {
        async function ListenForTo() {
            const listining = ref(database, 'messages/' + toAddress.toLowerCase() + '/unread/' + fromAddress.toLowerCase());
            onValue(listining, (snapshot) => {
                const data = snapshot.val();
                getMessages();
            });
        }
        ListenForTo();
    }, [])

    async function getMessages() {
        let AllMessages = await GetAllChatMessages(toAddress, fromAddress);
        //@ts-ignore
        setChatMessages(AllMessages);
        //console.log(AllMessages);
    }

    //Call This once the contact is created and returned to chat screen.
    async function checkForNewAlias(from: string, to: string) {
        console.log(from);
        console.log(to);

        const docRef = doc(db, from, to);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let docData = docSnap.data();
          console.log(docData.alias);
          setLoadedToAddress(docData.alias);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          //@ts-ignore
          setLoadedToAddress(cutUserAddress(toAddress));
        }
    }

    useEffect(() => {
        getMessages();
        scrollToBottom();
    }, [])

    return (
        <>
            <ChatRoomBox>
                {toAlias && <>
                    <h4>{toAlias}</h4>
                </>}
                {!toAlias && <>
                <h4> {cutUserAddress(toAddress)} </h4>
                </>}
            </ChatRoomBox>

            <ChatRoomContainer>
                {chatMessages.map((data) =>
                    <>
                        {data.time != null && <>
                            {data.from != fromAddress && <>
                                <FromBox>
                                    <p> {data.message} </p>
                                </FromBox>
                            </>}
                            {data.from != toAddress && <>
                                <ToBox>
                                    <p> {data.message} </p>
                                </ToBox>
                            </>}
                        </>}
                    </>
                )}
            </ChatRoomContainer>

            <InputBoxContainer>
                <InputMessage placeholder={"Enter Message"} value={message} onChange={e => setMessage(e.target.value)}  />
                <br /> <br /> <br />

                <SendPlaneContainer>
                    <SendPlane size={30} color="white" onClick={() => sendMessage()} />
                </SendPlaneContainer>
            </InputBoxContainer>

        </>
    )
}
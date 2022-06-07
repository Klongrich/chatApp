import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

import { ref, onValue } from "firebase/database";
import { GetAllChatMessages } from "../utils/chatbox/GetAllChatMessages";

import { SendPlane } from "@styled-icons/remix-fill/SendPlane";
import { SendMessage } from "../utils/sendMessage";

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

const ChatRoomContainerDesktop = styled.div`
    background-color: black;
    color: white;

    padding-top: 20px;
    padding-bottom: 20px;

    height: 720px;

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

const InputMessageMobile = styled.textarea`
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

const InputMessageDesktop = styled.input`
    width: 70%;
    height: 55px;

    margin-right: 40px;

    border-radius: 15px;
    color: white;
    background-color: #454545;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 10px;

    font-size: 18px;
    line-height: 160%;

    outline-width: 0;
    resize: none;

    ::placeholder {
        color: #f0f0f0;
    }
`

const InputBoxContainerMobile = styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 20px;
    color: white;
    text-align: center;
    height: 100vh;
`

const InputBoxContainerDesktop= styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 50px;
    color: white;
    text-align: center;
    height: 100vh;
`

const SendPlaneContainerMobile = styled.div`
    text-align: right;
    padding-right: 32px;
    padding-top: 5px;
    margin-top: -81px;
`

const SendPlaneContainerDesktop = styled.div`
    text-align: right;
    padding-right: 150px;
    padding-top: 0px;
    margin-top: -83px;
`

export const ChatRoom = ({fromAddress, toAddress, toAlias, database} : any ) => {

    const [chatMessages, setChatMessages] = useState([{from: "", message: "", time: ""}]);
    const [message, setMessage] = useState("");


    const [isMobile, setIsMobile] = useState(false);

    function cutUserAddress(address : string) {
        if (address.includes("0x")) {
            return (address.substring(0, 5) + "...." + address.substring(address.length - 5, address.length));
        } else if (address) {
            return (address);
        } else {
            return (null);
        }
    }

    useEffect(() => {
        async function ListenForFrom() {
              const listining = ref(database, 'messages/' + fromAddress.toLowerCase() + '/unread/' + toAddress.toLowerCase());
              onValue(listining, (snapshot) => {
                getMessages();
            });
          }
          ListenForFrom();
    }, [])

    useEffect(() => {
        async function ListenForTo() {
            const listining = ref(database, 'messages/' + toAddress.toLowerCase() + '/unread/' + fromAddress.toLowerCase());
            onValue(listining, (snapshot) => {
                getMessages();
            });
        }
        ListenForTo();
    }, [])

    async function getMessages() {
        let AllMessages = await GetAllChatMessages(toAddress, fromAddress);
        //@ts-ignore
        setChatMessages(AllMessages);
    }

    function checkKey(key : any) {
        if (key === "Enter") {
            SendMessage(fromAddress, toAddress, message, null, null, setMessage);
            setMessage("");
        }
    }

    useEffect(() => {
        getMessages();
        if (window.innerWidth < 999) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
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

            {!isMobile && <>
            <ChatRoomContainerDesktop>
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
            </ChatRoomContainerDesktop>

            <InputBoxContainerDesktop>
                <InputMessageDesktop placeholder={"Enter Message"}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => checkKey(e.key)}
                      />
                <br /> <br /> <br />

                <SendPlaneContainerDesktop>
                    <SendPlane size={42} color="white" onClick={() => SendMessage(
                        fromAddress,
                        toAddress,
                        message,
                        null,
                        null,
                        setMessage
                    )} />
                </SendPlaneContainerDesktop>
            </InputBoxContainerDesktop>
            </>}

            {isMobile && <>
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

            <InputBoxContainerMobile>
                <InputMessageMobile placeholder={"Enter Message"}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                      />
                <br /> <br /> <br />

                <SendPlaneContainerMobile>
                    <SendPlane size={30} color="white" onClick={() => SendMessage(
                        fromAddress,
                        toAddress,
                        message,
                        null,
                        null,
                        setMessage
                    )} />
                </SendPlaneContainerMobile>
            </InputBoxContainerMobile>

            </>}

        </>
    )
}
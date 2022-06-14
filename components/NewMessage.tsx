import React, { useState} from "react";

import { SendPlane } from "@styled-icons/remix-fill/SendPlane"
import { SendNewMessage } from "../utils/sendNewMessage";

import { NewMessageBox,
        InputBoxContainer,
        InputToAddress,
        InputMessage,
        SendPlaneContainer
} from "../styles/NewMessge";

export const NewMessageScreen = ({userAddress, updateToChatRoom, setNewMessage, db} : any) => {

    const [toAddress, setToAddress] = useState("");
    const [message, setMessage] = useState("Enter Message");

    return (
        <>
            <NewMessageBox>
                <h2> New conversation</h2>
                <InputToAddress type="text" placeholder={"Recipient"} value={toAddress} onChange={e => setToAddress(e.target.value)} />
            </NewMessageBox>

            <InputBoxContainer>
                <InputMessage  placeholder={"Enter Message"} value={message} onChange={e => setMessage(e.target.value)}  />
                <br /> <br /> <br />

                <SendPlaneContainer>
                    <SendPlane size={40} color="white" onClick={() => SendNewMessage(
                         userAddress,
                         toAddress.toLowerCase(),
                         message,
                         updateToChatRoom,
                         setNewMessage,
                         setMessage,
                         db
                        )}
                    />
                </SendPlaneContainer>
            </InputBoxContainer>
        </>
    )
}
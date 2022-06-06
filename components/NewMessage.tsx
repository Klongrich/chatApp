import React, { useState} from "react";
import styled from "styled-components";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

import  { ChatRoom }  from "./ChatRoom";

import { writeData } from "../utils/writeData";
import { SendPlane } from "@styled-icons/remix-fill/SendPlane"

const NewMessageBox = styled.div`
    background-color: black;
    color:white;
    margin-top: 10px;
    height: 150px;
    padding-top: 0px;
    text-align: center;

    h2 {
        font-size: 25px;
    }
`

const InputBoxContainer = styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 5px;
    color: white;
    text-align: center;
    height: 850px;
`

const InputToAddress = styled.input`
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

const InputMessage = styled.textarea`
    width: 80%;
    height: 170px;

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

const SendPlaneContainer = styled.div`
    text-align: right;
    padding-right: 55px;
`

export const NewMessageScreen = ({userAddress, updateToChatRoom, setNewMessage} : any) => {

    const [toAddress, setToAddress] = useState("");
    const [message, setMessage] = useState("Enter Message");

    async function sendMessage() {
        setMessage(" ");
        console.log("Hello");
        console.log(message);
        console.log(toAddress);
        console.log(userAddress);

        if (!toAddress) {
            alert("Can't have Recicepnt Blak");
            return ;
        }

        //Add Checks here to see if they messages sends successfully or not.
        await writeData(userAddress, toAddress, message);

        updateToChatRoom(toAddress, userAddress);
        setNewMessage(false);
    }


      // onKeyUp handler function
  const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Escape") {
      const confirm = window.confirm(
        "Are you sure want to clear this text feild?"
      );

      if (confirm) {
        console.log("Hello World");
      }
    }
  };

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
                    <SendPlane size={40} color="white" onClick={() => sendMessage()} />
                </SendPlaneContainer>
            </InputBoxContainer>

        </>
    )
}
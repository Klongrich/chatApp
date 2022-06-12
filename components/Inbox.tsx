import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { cutUserAddress } from "../utils/strings/cutUserAddress";
import { ChatRoom }  from "./ChatRoom";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { getImageSize } from "next/dist/server/image-optimizer";

import { ref, onValue, getDatabase, get, child } from "firebase/database";

import { checkUserInboxDB } from "../utils/inbox/updateUserDB";


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

    margin-top: -10px;
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

const TimeStampBox = styled.div`
    text-align: right;
    padding-right: 27px;
    margin-top: -82px;

    color: #a3a3a3;
`

export const Inbox = ({userAddress, database, updateToChatRoom, db, userInboxMessages} : any) => {

    const [userMessages, setUserMessages] = useState([{from : "", alias : "", time : "0", message : ""}]);
    const [isMessaging, setIsMessaging] = useState(false);
    const [toAddress, setToAddress] = useState("");

    const [currentTime, setCurrentTime] = useState(0);

    function checkLatestMessageLength(Message : string) {
        if (Message != undefined) {
            if (Message.length > 80) {
                return(Message.substring(0, 80) + ".......")
            } else {
                return (Message);
            }
        }
    }

    function convertFromUnixTime(unix_timestamp : number) {
        var date = new Date(unix_timestamp);
        let diff = currentTime - (unix_timestamp);

        // console.log("Unix_Timestamp: " + unix_timestamp);
        // console.log("Current Time: " + currentTime);
        // console.log("diff: " + diff);

        if (diff < 86400000) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';

            hours %= 12;
            hours = hours || 12;
            //@ts-ignore
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            const strTime = `${hours}:${minutes} ${ampm}`;

            return (strTime);
        }

        if (diff > 86400000) {
            let fullDate = date.toString();
            let _res = fullDate.substring(4,11);
            return (_res);
        }
    }

    async function getInboxMessages() {
        let res = await localStorage.getItem("Inbox");
        if (res) {
            setUserMessages(await JSON.parse(res));
        }
    }

    useEffect(() => {
        setUserMessages(userInboxMessages);
    },[])

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
            {userInboxMessages.map((data : any) => <>
                {data.time != null && data.from != userAddress && data.from != "Free" && <>
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

                    <TimeStampBox>
                        <h5> {convertFromUnixTime(parseInt(data.time))}</h5>
                    </TimeStampBox>
                    <br /> <br />
                </>}
            </>)}
        </>}
        </Container>
    </>)
}

import React, {useState, useEffect} from "react";

import { cutUserAddress } from "../utils/strings/cutUserAddress";
import { ChatRoom }  from "./ChatRoom";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { Container,
         ProfilePicBox,
         LatestMessageBox,
         ContactBox,
         TimeStampBox
} from "../styles/Inbox";

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
                    <ContactBox onClick={() => updateToChatRoom(data.from, userAddress, data.alias, false)}>
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

import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { ref, onValue, getDatabase, get, child } from "firebase/database";
import { cutUserAddress } from "../utils/strings/cutUserAddress";
import { ChatRoom }  from "./ChatRoom";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { doc, getDoc } from "firebase/firestore/lite";
import { getImageSize } from "next/dist/server/image-optimizer";

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

export const Inbox = ({userAddress, database, updateToChatRoom, db} : any) => {

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

    async function getMessage(from : string, to : string) : Promise<string | undefined> {
        const dbRef = ref(getDatabase());

        let message : string;

        message = "";

        await get(child(dbRef, `messages/` + from.toLowerCase() + '/Inbox/' + to.toLowerCase() + '/message' )).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                message = data.message;
              } else {
                console.log("No data available");
              }
        }).catch((error) => {
            console.error(error);
        });

        return (message);
    }

    async function getTime(from : string, to : string) : Promise<number | undefined> {
        const dbRef = ref(getDatabase());

        let time : number;

        time = 0;

        await get(child(dbRef, `messages/` + from.toLowerCase() + '/Inbox/' + to.toLowerCase() + '/time' )).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                time = data.time;
              } else {
                console.log("No data available");
              }
        }).catch((error) => {
            console.error(error);
        });

        return (time);
    }

    async function getInboxMessage(from : string, to : string) {
        let timeX;
        let timeY;

        let message : string | undefined;
        let time;

        message = "";

        timeX = await getTime(from, to);
        timeY = await getTime(to, from);

       if (timeX != undefined && timeY != undefined) {
           if (timeX > timeY) {
                message = await getMessage(from, to);
                time = await getTime(from, to);
           } else {
                message = await getMessage(to, from);
                time = await getTime(to, from);
           }
       }

        let _messageObject = {
            from : to,
            message : message,
            time : time,
            alias : ""
        }

        return (_messageObject);
    }
    interface MessageObject {
        from : string;
        message : string | undefined;
        time : number | undefined;
        alias: string;
    }

    async function checkInbox(userAddress : string, setUserMessages : any) {
        const docRef = doc(db, userAddress, "Inbox");
        const docSnap = await getDoc(docRef);

        let userMessages : MessageObject[];
        userMessages =[{from : "", message: "", time : 0, alias : ""}];

        if (docSnap.exists()) {
            let docData = docSnap.data();

            if (docData[0]) {
                let messageObject = await getInboxMessage(userAddress, docData[0]);
                userMessages.push(messageObject);
            }

            if (docData[1]) {
                let messabeObject2 = await getInboxMessage(userAddress, docData[1]);
                userMessages.push(messabeObject2);
            }

            if (docData[2]) {
                let messageObject3 = await getInboxMessage(userAddress, docData[2]);
                userMessages.push(messageObject3);
            }

            if (docData[3]) {
                let messageObject4 = await getInboxMessage(userAddress, docData[3]);
                userMessages.push(messageObject4);
            }

            if (docData[4]) {
                let messageObject5 = await getInboxMessage(userAddress, docData[4]);
                userMessages.push(messageObject5);
            }

            if (docData[5]) {
                let messageObject6 = await getInboxMessage(userAddress, docData[5]);
                userMessages.push(messageObject6);
            }

            if (docData[6]) {
                let messageObject7 = await getInboxMessage(userAddress, docData[6]);
                userMessages.push(messageObject7);
            }

            if (docData[7]) {
                let messageObject8 = await getInboxMessage(userAddress, docData[7]);
                userMessages.push(messageObject8);
            }

            if (docData[8]) {
                let messageObject9 = await getInboxMessage(userAddress, docData[8]);
                userMessages.push(messageObject9);
            }

            if (docData[9]) {
                let messageObject10 = await getInboxMessage(userAddress, docData[8]);
                userMessages.push(messageObject10);
            }

        } else {
            console.log("No such document!");
        }

        let res = await userMessages.sort((t1 : any, t2 : any) => t2.time - t1.time);

        for (let x = 0; x < res.length; x++) {
            let key = res[x].from + userAddress + "alias";
            let alias = await localStorage.getItem(key);
            if (alias) {
                res[x].alias = alias;
            } else {
                //Add function to call firestore databse to check contact info for saved Alias.
                //ONLY if the user is loggin on from a different broswer.
            }
        }

        res = res.filter(data => data.from != '');

        setUserMessages(res);
    }

    useEffect(() => {
        async function listenForInbox() {
            const listining = ref(database, 'messages/' + userAddress + '/Inbox');
            //This function should be listening for an update to firebase instead of realtime database however
            //firebase update listening in nextjs and typescirpt dosen't work right now for me
            //So this is the next best thing. its not optmial though as I have to have one database call
            //make another database call rather than just having a singluar database connected to trigger
            //the call. Kind of sucks but it is what it is.
            await onValue(listining, (snapshot) => {
                const data = snapshot.val();

                //Listen for new messages to Inbox then pull full array from firebase
                checkInbox(userAddress, setUserMessages);
          });
        }
        listenForInbox();
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
                {data.time != null && data.from != userAddress && <>
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

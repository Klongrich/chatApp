import React, {useState, useEffect} from "react";
import styled from "styled-components";

import Image from "next/image"

import { doc, setDoc, getDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

const Container = styled.div`
    background-color: black;
    padding-top: 20px;
    color: white;
    height: 100vh;

    margin-top: -30px;

    h4 {
        text-align: center;
    }

    h2 {
        text-align: center;
    }
`

const EnterAliasBox = styled.div`
    background-color: black;
    text-align: center;
    margin-top: 60px;
`

const EnterInfoBox = styled.div`
    background-color: black;
    text-align: center;
    margin-top: 60px;
`

const InputInfo = styled.input`
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

const InputAlias = styled.input`
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

const BottomButtonContainer = styled.div`
    background-color: black;
`

const MiddleButtonContainer = styled.div`
    margin-top: 15px;
    background-color: black;
`

const BottomButtonCancle = styled.div`
    display: inline-block;

    width: 40%;
    text-align: center;

    border-radius: 20px;
    margin-left: 6%;
`

const BottomButtonSave = styled.div`
    display: inline-block;
    width: 40%;
    text-align: center;

    border-radius: 20px;
    margin-left: 6%;
`

export const NewContact = ({userAddress, contactPublicKey, db, setNewContact, updateToChatRoom} : any) => {

    const [alias, setAlias] = useState("Alais");
    const [email, setEmail] = useState("Email");
    const [name, setName] = useState(userAddress);
    const [phoneNumber, setPhoneNumber] = useState("Phone Number");

    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("/placeholder");

    const [viewMore, setViewMore] = useState(false);

    async function writeToCache(Key : string, docData : any, contactKey : string) {
        let aliasKey = Key + "alias"
        let emailKey = Key + "email"
        let phoneNumberKey = Key + "phoneNumber"

        await localStorage.setItem(Key, docData.publicKey);
        await localStorage.setItem(aliasKey, docData.alias);
        await localStorage.setItem(emailKey, docData.email);
        await localStorage.setItem(phoneNumberKey, docData.phoneNumber);

        setAlias(docData.alias);
        setName(docData.publicKey);
        setEmail(docData.email);
        setPhoneNumber(docData.phoneNumber);
    }

    async function setNewContactInformation() {
        const docContactData = {
            alias : alias,
            publicKey: contactPublicKey,
            email : email,
            phoneNumber: phoneNumber,
            name: name,
        };

        await setDoc(doc(db, userAddress, contactPublicKey), docContactData);

        await localStorage.setItem(contactPublicKey, contactPublicKey + ":" + alias);

        await writeToCache(contactPublicKey + userAddress, docContactData, contactPublicKey);

        let contactsRef = doc(db, "Contacts", userAddress);
        await setDoc(contactsRef, { contactPublicKey : contactPublicKey}, {merge : true});

        setNewContact(false);
        updateToChatRoom(contactPublicKey, userAddress, alias);
    }

    async function uploadProfileImage() {
        const storage = getStorage();
        const profileImageRef = ref(storage, 'profileImageTest.jpeg');
        //@ts-ignore
        uploadBytes(profileImageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
    }

    async function testDownloadImages() {
        const storage = getStorage();
        getDownloadURL(ref(storage, 'profileImageTest.jpeg')).then((url) => {
            setImageURL(url);
        }).catch((error) => {
            // Create a root reference
            console.log("error getting Image");
        })
    }

    //Call This once the contact is created and returned to chat screen.
    async function getContactInfo(from: string, to: string) {
        const docRef = doc(db, from, to);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let docData = docSnap.data();
            let Key = docData.publicKey + from;
            writeToCache(Key, docData, docData.publicKey);
        } else {
            console.log("No such document!");
        }
    }

    async function CheckCache(from : string, to : string) {
        let Key = to + from;

        let isCached = await localStorage.getItem(Key)

        if (isCached == null) {
            await getContactInfo(from, to);
        } else {
            let publicKey = await localStorage.getItem(Key);
            let alias = await localStorage.getItem(Key + "alias");
            let email = await localStorage.getItem(Key + "email");
            let phoneNumber = await localStorage.getItem(Key + "phoneNumber");

            setAlias(alias ? alias : "Alias");
            setName(publicKey ? publicKey : "Public Key");
            setEmail(email ? email : "Email");
            setPhoneNumber(phoneNumber ? phoneNumber : "Phone Number");
        }
    }

    useEffect(() => {
        CheckCache(userAddress, contactPublicKey);
    }, [])

    return (
        <>
            <ChatRoomBox>
               <h4> Update Contact </h4>
            </ChatRoomBox>

            <Container>
                <EnterAliasBox>
                    <h3> Enter Alias</h3>

                    <InputAlias type="text"
                            placeholder={alias}
                            onChange={e => setAlias(e.target.value)}
                    />

                </EnterAliasBox>

            {!viewMore && <>
                <br /> <br />

            <MiddleButtonContainer>
                <BottomButtonCancle onClick={() => setNewContactInformation()}>
                    <p>Update</p>
                </BottomButtonCancle>
                <BottomButtonSave onClick={() => setViewMore(true)}>
                    <p>View More</p>
                </BottomButtonSave>
            </MiddleButtonContainer>
            </>}

            {viewMore && <>

            <EnterInfoBox>
                <InputInfo type="text"
                    placeholder={name}
                    onChange={e => setName(e.target.value)} />
            </EnterInfoBox>
            <EnterInfoBox>
                <InputInfo type="text"
                placeholder={email}
                onChange={e => setEmail(e.target.value)} />
            </EnterInfoBox>
            <EnterInfoBox>
                <InputInfo type="text"
                 placeholder={phoneNumber}
                 onChange={e => setPhoneNumber(e.target.value)} />
            </EnterInfoBox>

            <br /> <br /> <br /> <br />
            <BottomButtonContainer>
                <BottomButtonCancle onClick={() => setNewContact(false)}>
                    <p>Cancle</p>
                </BottomButtonCancle>
                <BottomButtonSave onClick={() => setNewContactInformation()}>
                    <p>Save</p>
                </BottomButtonSave>
            </BottomButtonContainer>

            <br /> <br />

                {/* <input
                  id="files"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    //@ts-ignore
                    const file = e.target.files[0];
                    //@ts-ignore
                    setImage(file);
                  }}
                />

                <br /> <br /> <br />
                <button onClick={() => uploadProfileImage()}>
                    Click To upload Image
                </button>
                <br /> <br/ > <br />
                <button onClick={() => testDownloadImages()}>
                    Test Download Images
                </button>

                <Image src={imageURL} height={200} width={350} alt="" /> */}
            </>}

            </Container>
        </>
    )

}
import React, {useEffect, useState} from "react";
import styled from "styled-components";

const ContactMetaBox = styled.div`
    color: white;

    padding-left: 50px;

    button {
        width: 110px;
        margin-left: 10px;
    }
`

export default function ContactMeta({userAddress,contactAddress, alias, setDisplayMeta, setUpdateToChatRoom} : any) {

    return (
        <>
            <ContactMetaBox>
                <h4> Name </h4>
                <h5> {alias} </h5>

                <h4> User Address </h4>
                <h5> {userAddress} </h5>

                <h4> Contact Address </h4>
                <h5> {contactAddress} </h5>

                <button onClick={() => setDisplayMeta(false)}>
                    return
                </button>

                <button onClick={() => setUpdateToChatRoom(contactAddress, userAddress, alias)}>
                    chat
                </button>
            </ContactMetaBox>
        </>
    )
}
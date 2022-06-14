import styled from "styled-components"

export const Container = styled.div`
    background-color: black;
    padding-top: 20px;
    color: white;
    height: 100vh;

    margin-top: -30px;
`

export const ProfilePicBox = styled.div`
    border-radius: 50%;
    background-color: grey;

    height: 42px;
    width: 42px;

    margin-top: 20px;
    margin-left: 5px;
    margin-bottom: -65px;
`

export const ContactContaier = styled.div`
    text-align: left;

    margin-top: -10px;

    h4 {
        padding-left: 65px;
    }

    p {
        padding-left: 65px;
        padding-right: 10px;
        margin-top: -20px;

        font-size: 12px;
        color: #a3a3a3;
    }
`

export const ContactsPublicKeyBox = styled.div`
    height: 40px;
`
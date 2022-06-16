import styled from "styled-components";

export const Container = styled.div`
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

export const ProfilePicBox = styled.div`
    border-radius: 100%;
    background-color: #d8d8d8;

    height: 38px;
    width: 38px;

    margin-top: 20px;
    margin-left: 5px;
    margin-bottom: -65px;
`

export const ContactsPublicKeyBox = styled.div`
    height: 40px;
`

export const ContactContaier = styled.div`
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

    :hover {
        cursor : pointer;
    }
`

export const SyncBox = styled.div`
    text-align: right;
    padding-right: 27px;
    margin-top: -82px;

    color: #a3a3a3;
`
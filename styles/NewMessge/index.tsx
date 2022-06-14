import styled from "styled-components";

export const NewMessageBox = styled.div`
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

export const InputBoxContainer = styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 5px;
    color: white;
    text-align: center;
    height: 850px;
`

export const InputToAddress = styled.input`
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

export const InputMessage = styled.textarea`
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

export const SendPlaneContainer = styled.div`
    text-align: right;
    padding-right: 55px;
`
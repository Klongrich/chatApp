import styled from 'styled-components';

export const ChatRoomBox = styled.div`
    background-color: black;
    color: white;

    height: 50px;

    width: 100%;

    h4 {
        text-align: center;
        font-size: 22px;
    }
`

export const ChatRoomContainer = styled.div`
    background-color: black;
    color: white;

    padding-top: 20px;
    padding-bottom: 20px;

    height: 490px;

    overflow: auto;
    bottom: 0;
`

export const ChatRoomContainerDesktop = styled.div`
    background-color: black;
    color: white;

    padding-top: 20px;
    padding-bottom: 20px;

    height: 720px;

    overflow: auto;
    bottom: 0;

`

export const FromBox = styled.div`
    background-color: #4a4a4a;
    text-align: left;
    width: 50%;
    margin-left: 3%;

    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 10px;
    padding-right: 10px;

    margin-top: 15px;

    border-radius: 15px;

    font-size: 12px;

    h4 {
        font-size: 10px;
    }
`

export const ToBox = styled.div`
    background-color: #03A390;
    text-align: left;
    padding-right: 10px;
    padding-left: 10px;
    width: 50%;
    margin-left: 42%;

    padding-top: 1px;
    padding-bottom: 1px;

    margin-top: 15px;

    line-height: 1.2;
    border-radius: 15px;

    font-size: 12px;

    h4 {
        font-size: 10px;
    }
`

export const InputMessageMobile = styled.textarea`
    width: 70%;
    height: 45px;

    margin-right: 40px;

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

export const InputMessageDesktop = styled.input`
    width: 70%;
    height: 55px;

    margin-right: 40px;

    border-radius: 15px;
    color: white;
    background-color: #454545;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 10px;

    font-size: 18px;
    line-height: 160%;

    outline-width: 0;
    resize: none;

    ::placeholder {
        color: #f0f0f0;
    }
`

export const InputBoxContainerMobile = styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 20px;
    color: white;
    text-align: center;
    height: 200px;
`

export const InputBoxContainerDesktop= styled.div`
    background-color: black;
    border-top: 3px solid black;
    padding-top: 50px;
    color: white;
    text-align: center;
    height: 100vh;
`

export const SendPlaneContainerMobile = styled.div`
    text-align: right;
    padding-right: 32px;
    padding-top: 5px;
    margin-top: -81px;
    background-color: black;
    height: 100%;
`

export const SendPlaneContainerDesktop = styled.div`
    text-align: right;
    padding-right: 150px;
    padding-top: 0px;
    margin-top: -83px;
`
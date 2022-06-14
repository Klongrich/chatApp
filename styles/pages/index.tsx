import styled from 'styled-components';

export const HeaderBox = styled.div`
  color: white;
  background-color: black;


  font-family: SanFransico;

  margin-top: -20px;
  padding-top: 30px;
  padding-bottom: 10px;

  h2 {
    margin-left: 20px;
    font-size: 28px;
    margin-bottom: 37px;
  }

  ul {
    list-style-type: none;
    padding-bottom: 20px;
    margin-bottom: 30px;
    margin-left: -30px;
  }

  li {
    display: inline-block;
    font-size: 19px;
    padding-left: 12px;
    padding-right: 12px;

    color: #d8d8d8;

    :hover {
      color: blue;
      cursor: pointer;
    }
  }
`

export const LogInBox = styled.div`
  background-color: black;
  color: white;

  text-align: center;
  height: 100vh;
  margin-top: -20px;

  padding-top: 150px;

  h2 {
    padding-bottom: 20px;
    font-size: 28px;
  }

  h3 {
    padding-bottom: 20px;
    font-size: 22px;
  }

  button {
    width: 220px;
    height: 32px;
    padding: 2px;
    margin-bottom: 20px;
  }
`

export const NewMessageBox = styled.div`
  border-radius: 50%;
  width: 65px;
  height: 65px;

  padding-left: 13px;
  padding-top: 15px;

  background-color: #737373;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);

  margin-top: -410px;
  margin-left: 70%;
`

export const LogOutArrow = styled.div`
  text-align: right;
  padding-top: 30px;
  padding-right: 32px;
  margin-bottom: -53px;
`

export const NewMessageArrowBox = styled.div`
  margin-bottom: -50px;
  padding-top: 40px;
  background-color: black;
  padding-left: 25px;
`

export const BackArrowBox = styled.div`
  background-color: black;
  padding-left: 7%;

  padding-top: 30px;
`

export const AddContactBox = styled.div`
  margin-top: -30px;
  border: 1px solid black;
  background-color: black;

  padding-left: 83%;

  margin-bottom: -55px;
`

export const NewContactBackArrowBox = styled.div`
  border: 1px solid black;
  background-color: black;

  padding-left: 83%;
`

export const AddContactButton = styled.div`
  border-radius: 50%;
  width: 65px;
  height: 65px;

  padding-left: 13px;
  padding-top: 15px;

  background-color: #737373;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);

  margin-top: -410px;
  margin-left: 70%;
`

export const EditMessageBox = styled.div`
  background-color: yellow;
`

export const ContainerBox = styled.div`
  width: 100%;
`
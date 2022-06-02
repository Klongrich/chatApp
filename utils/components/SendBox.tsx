
import React, {useState} from 'react';
import styled from 'styled-components';

import { writeData } from "../utils/writeData";

const Container = styled.div`
    background-color: blue;
    height: 300px;
    width: 100%;
    border: 1px solid black;

    text-align: center;
`
const InputAddress = styled.input`
  width: 98%;
  height: 30px;

  text-align:center;
`

export default function SendBox({userAddress} : any) {

    const [message, setMessage] = useState("");
    const [toAddress, setToAddress] = useState("");

    return (
        <>
            <Container>
                <h2> Send Message </h2>

                <InputAddress type="text"
                            placeholder="Input To Address"
                            onChange={e => setToAddress(e.target.value)}
                />
                <br /> <br />

                <textarea
                    placeholder="Input Message"
                    cols={40}
                    rows={5}
                    onChange={e => setMessage(e.target.value)}
                />

                <br /> <br />

                <button onClick={() => writeData(userAddress, toAddress, message)}>
                    Send Message
                </button>
            </Container>
        </>
    )
}

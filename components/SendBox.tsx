import React, {useState} from 'react';

import { writeData } from "../utils/writeData";

import { Container, InputAddress } from "../styles/SendBox";

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

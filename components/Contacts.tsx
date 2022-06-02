import React from 'react';
import styled from "styled-components";

//Refactor hot fix to move this into this function / component rather than calling it
//in the index file.

const Box = styled.div`
    margin-top: 20px;
    padding-top: 5px;
    height: 340px;
    width: 100%;
    background-color: brown;

    padding: 10px;
    overflow: hidden;

    text-align: center;
`

export default function Contacts({txsData} : any) {

    return(
        <>
        <Box>
            <h2> Recent Transcations From Address </h2>
            {txsData.map((data : any) =>
                <>
                {data.address != "" &&
                <>
                    <p> Contact: {data.address.substring(0,7) + "...." + data.address.substring(32, 42)} </p>
                    <p> blockNumber: {data.blocknumber} </p> <br/>
                    </>
                }
                </>
            )}
        </Box>
        </>
    )
}

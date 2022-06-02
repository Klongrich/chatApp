import React from 'react';
import styled from "styled-components";

//Refactor hot fix to move this into this function / component rather than calling it
//in the index file.
import { GetUserTransactions } from "../utils/getUserTransacitons";

const Box = styled.div`
    margin-top: 20px;
    padding-top: 5px;
    height: 340px;
    width: 80%;
    background-color: brown;

    overflow: hidden;
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
                    <p> Contact: {data.address} </p>
                    <p> blockNumber: {data.blocknumber} </p> <br/>
                    </>
                }
                </>
            )}
            <h3>Huh</h3>
        </Box>
        </>
    )
}
import { parse } from "path/posix";
import React, {useEffect, useState} from "react";

import { MetaDisplayBox,
        MetaNftBox,
        AllMetaNftBox
} from "../styles/MetaBox";

export function MetaBox({userERC721, userERC20, ERC20IsLoaded, ERC721IsLoaded, userAddress} : any) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [viewMore, setViewMore] = useState(false);

    const [userERC721meta, setUserERC721meta] = useState([{
        tokenName : "",
        tokenId : 0,
        contractAddress : "",
        tokenSymbol : "",
        tokenURI : "",
        image : ""
      }])


    async function getChachedMeta() {
        let testAddress = "0x95081b2071cB069989D56817baDa7dF33bbA77B1"
        let key = testAddress + "userERC721meta"

        console.log(key);

        let _chachedMeta = await localStorage.getItem(key)

        if (_chachedMeta) {
            let parsed = await JSON.parse(_chachedMeta);

            console.log(parsed);

            for (let x = 0; x < parsed.length; x++) {
                if (parsed[x].image) {
                    console.log(parsed[x].image);
                    let length = parsed[x].image.length;
                    let imageURL = parsed[x].image;

                    console.log("Length: " + length);

                    if (length == 53) {
                        console.log("Need to pull a Image Blob")
                        let checkIPFS = imageURL.substring(0, 4);

                        if (checkIPFS == "ipfs") {
                            let ipfsHash = imageURL.substring(7, imageURL.length);
                            console.log(ipfsHash);
                            let baseURL = "https://ipfs.io/ipfs/";

                            let _IPFSImageURL = baseURL + ipfsHash;

                            await fetch(_IPFSImageURL)
                                .then(res => res.blob())
                                .then(imageBlob => {
                                    const imageObjectURL = URL.createObjectURL(imageBlob);
                                    console.log(imageObjectURL);

                                    parsed[x].image = imageObjectURL;
                                })
                        }

                    }
                }
            }
            setUserERC721meta(parsed);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        console.log("Hello World");
        getChachedMeta();
    }, [])

    return (
    <>
        <MetaDisplayBox>
            <h2> nft </h2>

            {!isLoaded && <>
                <h2> fetching nfts from ipfs please wait ...... </h2>
            </>}
            {isLoaded && <>
                {viewMore && <>
                    <AllMetaNftBox>
                    {userERC721meta.map((data : any) =>
                        <>
                            {data.tokenSymbol != "ENS" && <>
                                <img src={data.image} height={150} width={150} alt="" />
                            </>}
                        </>
                    )}
                    </AllMetaNftBox>
                    <h4 onClick={() => setViewMore(false)}> close </h4>

                </>}

                {!viewMore && <>
                    <MetaNftBox>
                        <img src={userERC721meta[1].image}  height={150} width={150} alt="" />
                        <img src={userERC721meta[2].image}  height={150} width={150} alt="" />
                    </MetaNftBox>
                    <h4 onClick={() => setViewMore(true)}> View More </h4>

                    <h2> dao </h2>
                </>}
            </>}
        </MetaDisplayBox>
    </>)
}
import { parse } from "path/posix";
import React, {useEffect, useState} from "react";
import Image from "next/image";

import { ToggleOff } from "@styled-icons/bootstrap/ToggleOff";
import { ToggleOn } from "@styled-icons/bootstrap/ToggleOn";

import { GetCoinPrice } from "../utils/tokens/getERCTokenPrice";
import { getBNBPrice } from "../utils/tokens/getBNBPrice";

import { _pullERC721TokenMeta } from "../utils/eth/_pullERC721TokenMeta";
import { _pullERC20TokenMeta, getERC20Balances } from "../utils/eth/_pullERC20TokenMeta";

import { getERC20TokenBalance } from "../utils/eth/getERC20TokenBalance";

import { MetaDisplayBox,
        MetaNftBox,
        AllMetaNftBox,
        DaoMetaBox,
        DaoMetaAmountBox,
        DaoLogoImageBox,
        DaoCurrentPriceBox,
        BottomLine,
        NoNftsFoundBox,
        FetchingNFTMeta,
        ToggleBox,
        ToggleBoxText,
        ToggleBoxSwitch,
        PullNFTsBox,
        MetaInitBox,
        MetaLoadingBox,
        FetchingDAOMeta
} from "../styles/MetaBox";


let exampleMeta = [
    {
        Name : "AAVE",
        Amount: 100.00,
        LogoImage : "/static/images/tokenLogos/aave-logo.png",
        Price : 56.72,
        Address : "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
    },
    {
        Name : "BNB",
        Amount: 231.02,
        LogoImage : "/static/images/tokenLogos/bnb_logo.png",
        Price : 8.42,
        Address : "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
    },
    {
        Name : "APE",
        Amount: 4120.20,
        LogoImage : "/static/images/tokenLogos/apecoin.png",
        Price : 3.32,
        Address : "0x4d224452801aced8b2f0aebe155379bb5d594381"
    },
    {
        Name : "UNI",
        Amount: 14.82,
        LogoImage : "/static/images/tokenLogos/uniswap-uni-logo.png",
        Price : 3.42,
        Address : "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    },
    {
        Name : "CRV",
        Amount: 1.2,
        LogoImage : "/static/images/tokenLogos/curve_logo.png",
        Price : 3.32,
        Address: "0xD533a949740bb3306d119CC777fa900bA034cd52"
    },
    {
        Name : "ENS",
        Amount: 234,
        LogoImage : "/static/images/tokenLogos/ens-logo.png",
        Price : 8.32,
        Address : "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72"
    },
    {
        Name : "SUSHI",
        Amount : 823.4,
        LogoImage : "/static/images/tokenLogos/SushiSwap.png",
        Price : 0.92,
        Address : "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"
    },
    {
        Name: "MKR",
        Amount: 178.93,
        LogoImage : "/static/images/tokenLogos/makerDAO.png",
        Price: 284.39,
        Address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
    }
]

const TestAddress = "0x13b42d3e209c377798b4e71ce939a2bdde23cb6b"

export function MetaBox({userERC721, userERC20, ERC20IsLoaded, ERC721IsLoaded, userAddress} : any) {

    const [erc721IsLoaded, setErc721IsLoaded] = useState(false);
    const [erc20IsLoaded, setErc20IsLoaded] = useState(false);

    const [viewMoreERC721, setViewMoreERC721] = useState(false);
    const [viewMoreERC20, setViewMoreERC20] = useState(false);

    const [hasNfts, setHasNfts] = useState(false);
    const [togglePrice, setTogglePrice] = useState(true);

    const [hasPulledMeta, setHasPulledMeta] = useState(false);
    const [isPullingMeta, setIsPullingMeta] = useState(false);

    const [pullingMetaState, setPullingMetaState] = useState("Starting ....")
    const [pullingMetaProgess, setPullingMetaProgress] = useState("0");

    const [userERC20meta, setUserERC20meta] = useState(exampleMeta);

    const [userERC721meta, setUserERC721meta] = useState([{
        tokenName : "",
        tokenId : 0,
        contractAddress : "",
        tokenSymbol : "",
        tokenURI : "",
        image : ""
      }])


    async function getChachedMeta(_chachedMeta : any) {
        if (_chachedMeta) {

            let parsed = await JSON.parse(_chachedMeta);

            for (let x = 0; x < parsed.length; x++) {
                if (parsed[x].image) {
                    let length = parsed[x].image.length;
                    let imageURL = parsed[x].image;

                    let ipfsCheck = imageURL.substring(0, 4);
                    let pinataCheck = imageURL.substring(8, 22);

                    const controller = new AbortController();
                    let timeoutId = setTimeout(() => controller.abort(), 5000);

                    if (pinataCheck == "gateway.pinata") {
                        if (length != 53) {
                            try {
                                await fetch(imageURL,{ signal: controller.signal })
                                    .then(res => res.blob())
                                    .then(data => {
                                        const localizedImageRef = URL.createObjectURL(data);
                                        console.log(localizedImageRef);
                                        parsed[x].image = localizedImageRef;

                                        clearTimeout(timeoutId);
                                    })
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                    }

                    const controller2 = new AbortController();
                    let timeoutId2 = setTimeout(() => controller2.abort(), 5000);

                    if (ipfsCheck == "ipfs") {
                        if (length != 53) {
                            let baseURL = "https://ipfs.io/ipfs/";
                            let ipfsHash = imageURL.substring(7, imageURL.length);
                            let newImageURL = baseURL + ipfsHash;

                            parsed[x].image = newImageURL;

                            try {
                                await fetch(newImageURL,{ signal: controller.signal })
                                    .then(res => res.blob())
                                    .then(data => {
                                        const localizedImageRef = URL.createObjectURL(data);
                                        console.log(localizedImageRef);
                                        parsed[x].image = localizedImageRef;

                                        clearTimeout(timeoutId2);
                                    })
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                    }

                    const controller3 = new AbortController();
                    let timeoutId3 = setTimeout(() => controller3.abort(), 5000);

                    if (length == 53) {
                        let checkIPFS = imageURL.substring(0, 4);

                        if (checkIPFS == "ipfs") {
                            let ipfsHash = imageURL.substring(7, imageURL.length);
                            let baseURL = "https://ipfs.io/ipfs/";
                            let _IPFSImageURL = baseURL + ipfsHash;

                            try {
                                await fetch(_IPFSImageURL,{ signal: controller.signal })
                                    .then(res => res.blob())
                                    .then(imageBlob => {
                                        const imageObjectURL = URL.createObjectURL(imageBlob);
                                        parsed[x].image = imageObjectURL;
                                        clearTimeout(timeoutId3);
                                    })
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                }
            }

            let _temp = [{}];

            for (let z = 0; z < parsed.length; z++) {
                if (parsed[z].image) {
                    _temp.push(parsed[z]);
                }
            }
            //@ts-ignore
            setUserERC721meta(_temp);
            setErc721IsLoaded(true);
            if (_temp.length == 1) {
                setHasNfts(false);
            } else {
                setHasNfts(true);
            }
        }
    }

    async function getDaoTokenPrices() {
        for (let x = 0; x < exampleMeta.length; x++) {
            if (exampleMeta[x].Name == "BNB") {
                let bnbPrice = await getBNBPrice();
                exampleMeta[x].Price = bnbPrice;
            } else {
                let _currentPrice = await GetCoinPrice(exampleMeta[x].Address);
                exampleMeta[x].Price = _currentPrice;
            }

            let amount = await getERC20TokenBalance(userAddress, exampleMeta[x].Address);
            exampleMeta[x].Amount = amount;
        }
        setUserERC20meta(exampleMeta);
        setErc20IsLoaded(true);
    }

    async function loadUser() {
        let key = userAddress + "userERC721meta"
        let _chachedMeta = await localStorage.getItem(key);

        if (_chachedMeta) {
            setHasPulledMeta(true);
            getChachedMeta(_chachedMeta);
            getDaoTokenPrices();
        } else {
            setIsPullingMeta(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, [])


    async function pullUserMetaS() {
        setIsPullingMeta(true);

        let userERC721data = await _pullERC721TokenMeta(userAddress, setPullingMetaState, setPullingMetaProgress);

        setPullingMetaState("Returned NFTs ... Pulling ERC20 Tokens");
        let userERC20data = await _pullERC20TokenMeta(userAddress, setPullingMetaState, setPullingMetaProgress)
        await getDaoTokenPrices();

        setPullingMetaState("Returned DAO Tokens");
        setPullingMetaProgress("Meta Pulled!");
        //setUserERC20meta(userERC20data);

        //write to the users cache
        let _key721 = userAddress + "userERC721meta";
        let _key20 = userAddress + "userERC20meta";

        let _erc721data =  JSON.stringify(userERC721data);
        let _erc20data =  JSON.stringify(userERC20data);

        await localStorage.setItem(_key721, _erc721data);
        await localStorage.setItem(_key20, _erc20data);

        //rebuild
        await getChachedMeta(_erc721data); 

        if (!isPullingMeta) {
            setErc721IsLoaded(true);
            setHasPulledMeta(true);
            setErc20IsLoaded(true);
        }
    }

    return (
    <>
        <MetaDisplayBox>
        {!hasPulledMeta && <>
            <PullNFTsBox>
                {!isPullingMeta && <>
                    <MetaInitBox>
                        <h2> Meta Initialization</h2>
                        <p> On the first call, inital sync time is 1 - 5 mins depending on network</p>
                    </MetaInitBox>
                    <button onClick={() => pullUserMetaS()}>
                            Sync Data
                    </button>
                </>}

                {isPullingMeta && <>
                    <MetaLoadingBox>
                        <h3> {pullingMetaState} </h3>
                        <p> {pullingMetaProgess} </p>
                  </MetaLoadingBox>
                  <button onClick={() => setIsPullingMeta(false)}>
                    Cancle
                    </button>
                </>}

            </PullNFTsBox>
        </>}

        {hasPulledMeta && <>
            <h2> nft </h2>
            <ToggleBox>
                {togglePrice && <>
                    <ToggleBoxText>
                        <h3>Price</h3>
                    </ToggleBoxText>
                    <ToggleBoxSwitch>
                        <ToggleOn size={30} onClick={() => setTogglePrice(!togglePrice)} />
                    </ToggleBoxSwitch>
                </>}
                {!togglePrice && <>
                    <ToggleBoxText>
                        <h3>Amount</h3>
                    </ToggleBoxText>
                    <ToggleBoxSwitch>
                        <ToggleOff size={30} onClick={() => setTogglePrice(!togglePrice)}/>
                    </ToggleBoxSwitch>
                </>}
            </ToggleBox>
            {!erc721IsLoaded && <>
                <FetchingNFTMeta>
                    <h2> fetching nfts from ipfs please wait ...... </h2>
                </FetchingNFTMeta>
            </>}
            {erc721IsLoaded && hasNfts && <>
                {viewMoreERC721 && <>
                    <AllMetaNftBox>
                    {userERC721meta.map((data : any) =>
                        <>
                            {data.tokenSymbol != "ENS" && data.image && <>
                                <img src={data.image} height={150} width={150} />
                            </>}
                        </>
                    )}
                    </AllMetaNftBox>
                    <h4 onClick={() => setViewMoreERC721(false)}> close </h4>

                </>}

                {!viewMoreERC721 && <>
                    <MetaNftBox>
                        <img src={userERC721meta[1].image}  height={150} width={150} alt=" " />
                        <img src={userERC721meta[2].image}  height={150} width={150} alt=" " />
                    </MetaNftBox>
                    <h4 onClick={() => setViewMoreERC721(true)}> View More </h4>
                </>}
            </>}

            {erc721IsLoaded && !hasNfts && <>
                 <NoNftsFoundBox>
                    <h3> No NFTs Found! </h3>
                    <h5> <a href="https://x2y2.io/"> Click Here To Purchase </a> </h5>
                </NoNftsFoundBox>
            </>}

            {!viewMoreERC721 && <>
                <h2> dao </h2>
            </>}

            {!erc20IsLoaded && !viewMoreERC721 && <>
                <FetchingDAOMeta>
                    <h2> fetching meta from blockchain please wait ...... </h2>
                </FetchingDAOMeta>
            </>}

            {erc20IsLoaded && !viewMoreERC721 && <>
                {viewMoreERC20 && <>
                    {exampleMeta.map((data : any) =>
                    <>
                        <DaoMetaBox>
                            <DaoMetaAmountBox>
                                <Image src={data.LogoImage} height={40} width={40} />
                            </DaoMetaAmountBox>
                            <DaoLogoImageBox>
                                {togglePrice && <>
                                    <p> {data.Amount} </p>
                                </>}
                                {!togglePrice && <>
                                    <p> $ {data.Price} </p>
                                </>}
                            </DaoLogoImageBox>
                            <BottomLine />
                        </DaoMetaBox>
                    </>
                    )}
                    <h4 onClick={() => setViewMoreERC20(false)}> close </h4>
                </>}
                {!viewMoreERC20 && <>
                    <DaoMetaBox>
                        <DaoMetaAmountBox>
                            <Image src={exampleMeta[0].LogoImage} height={40} width={40} />
                        </DaoMetaAmountBox>
                        <DaoLogoImageBox>
                            {togglePrice && <>
                                <p> {exampleMeta[0].Amount} </p>
                            </>}
                            {!togglePrice && <>
                                <p> $ {exampleMeta[0].Price} </p>
                            </>}
                        </DaoLogoImageBox>
                        <BottomLine />
                    </DaoMetaBox>

                    <DaoMetaBox>
                        <DaoMetaAmountBox>
                            <Image src={exampleMeta[1].LogoImage} height={40} width={40} />
                        </DaoMetaAmountBox>
                        <DaoLogoImageBox>
                            {togglePrice && <>
                                <p> {exampleMeta[1].Amount} </p>
                            </>}
                            {!togglePrice && <>
                                <p> $ {exampleMeta[1].Price} </p>
                            </>}
                        </DaoLogoImageBox>
                        <BottomLine />
                    </DaoMetaBox>

                    <DaoMetaBox>
                        <DaoMetaAmountBox>
                            <Image src={exampleMeta[2].LogoImage} height={40} width={40} />
                        </DaoMetaAmountBox>
                        <DaoLogoImageBox>
                            {togglePrice && <>
                                <p> {exampleMeta[2].Amount} </p>
                            </>}
                            {!togglePrice && <>
                                <p> $ {exampleMeta[2].Price} </p>
                            </>}
                        </DaoLogoImageBox>
                        <BottomLine />
                    </DaoMetaBox>

                    <DaoMetaBox>
                        <DaoMetaAmountBox>
                            <Image src={exampleMeta[3].LogoImage} height={40} width={40} />
                        </DaoMetaAmountBox>
                        <DaoLogoImageBox>
                            {togglePrice && <>
                                <p> {exampleMeta[3].Amount} </p>
                            </>}
                            {!togglePrice && <>
                                <p> $ {exampleMeta[3].Price} </p>
                            </>}
                        </DaoLogoImageBox>
                        <BottomLine />
                    </DaoMetaBox>
                    <br /> <br /><h4 onClick={() => setViewMoreERC20(true)}> View More </h4>
                </>}
            </>}
        </>}
        </MetaDisplayBox>
    </>)
}
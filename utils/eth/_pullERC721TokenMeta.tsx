import { AbiItem } from 'web3-utils';
import { ERC_721_ABI}  from "../../static/ERC721ABI";
import { web3 } from "../../static/InfuraProvider";

export async function _pullERC721TokenMeta(address : string, setState : any, setProgress : any) {

    let erc721apiURL = "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" + address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + process.env.ETHERSCAN_API_KEY;

    let _rawData : any = [];

    await fetch(erc721apiURL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            _rawData = data.result;
        })

    let userERC721TokenMeta : any = [];

    setState(_rawData.length + " ERC721 Transfer Events Found!")
    console.log(address);

    for (let x = 0; x < _rawData.length; x++) {
        let nftAddress = _rawData[x].contractAddress;
        let tokenId = _rawData[x].tokenID;

        let contract = await new web3.eth.Contract(ERC_721_ABI as AbiItem[], nftAddress);

        try {
            await contract.methods.ownerOf(tokenId).call(function(error : any, result : any){
                if (result == address) {
                    let _dataObject = {
                        tokenName : _rawData[x].tokenName,
                        tokenId : tokenId,
                        contractAddress : nftAddress,
                        tokenSymbol : _rawData[x].tokenSymbol,
                        tokenURI : "Get Token URI"
                    }
                    userERC721TokenMeta.push(_dataObject);
                }

            })
        } catch (error) {
            console.log(error);
        }
        setProgress("Parsing Transfer: " + x);
    }

    setState(userERC721TokenMeta.length + " NFTs Found! Pulling Meta From Nodes");

    for (let xx = 0; xx < userERC721TokenMeta.length; xx++) {
        let contract = await new web3.eth.Contract(ERC_721_ABI as AbiItem[], userERC721TokenMeta[xx].contractAddress);

        try {
            await contract.methods.tokenURI(userERC721TokenMeta[xx].tokenId).call(function(error : any, result : any) {
                userERC721TokenMeta[xx].tokenURI = result;
            })
        } catch (error) {
            console.log(error);
        }
        setProgress("Parsing NFT: " + xx);
    }

    for (let xxx = 0; xxx < userERC721TokenMeta.length; xxx++) {
        if (userERC721TokenMeta[xxx].tokenURI) {
            let _tokenURI = userERC721TokenMeta[xxx].tokenURI;
            let checkIPFS = _tokenURI.substring(0, 4);

            if (checkIPFS == "ipfs") {
                let ipfsHash = _tokenURI.substring(7, _tokenURI.length)
                let baseURL = "https://ipfs.io/ipfs/"

                 _tokenURI = baseURL + ipfsHash;
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            try {
                await fetch(_tokenURI,{ signal: controller.signal } )
                    .then(res => res.json())
                    .then(data => {
                        if (data.image) {
                            userERC721TokenMeta[xxx].image = data.image;
                        }
                        clearTimeout(timeoutId);
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            setProgress("Fetching NFT TokenURI: " + xxx);
    }

    //Filtering for same token transfered more than once between the users address
    userERC721TokenMeta = await userERC721TokenMeta.filter((thing : any, index : any, self : any)  =>
        index === self.findIndex((t : any) => (
          t.tokenURI === thing.tokenURI
    )));

    return (userERC721TokenMeta);
}
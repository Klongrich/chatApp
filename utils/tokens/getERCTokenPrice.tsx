export async function GetCoinPrice(contractAddress: string) {
    let price;

    price = 0;

    await fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + contractAddress + '&vs_currencies=usd')
            .then(res => res.text())
            .then(data => {
                console.log(data);
                if (data) {
                    let _temp = data.split(":");
                    let parseData = _temp[2].split("}")
                    price = parseFloat(parseData[0]).toFixed(2);
                }
            })
    return (price);
}

export default GetCoinPrice;
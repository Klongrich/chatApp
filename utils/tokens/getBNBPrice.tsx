export async function getBNBPrice() {

    let _url = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=1839&range=1D"

    let bnb_price;

    bnb_price = 0;

    await fetch(_url)
        .then(res => res.text())
        .then(data => {
            let _temp = data.split("timestamp");
            let newString = _temp[0].substring(_temp[0].length - 115, _temp[0].length - 109);

            bnb_price = parseFloat(newString);
        })

    return (bnb_price);
}
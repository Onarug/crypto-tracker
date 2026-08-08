const BASE_URL = "https://api.coingecko.com/api/v3"

export const FetchCryptos = async () => {
    const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    if(!response.ok){
        throw new Error("Failiure to fetch crypto");
    } 
    return response.json();

}

export const FetchCoinData = async (id) => {
    const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    if(!response.ok){
        throw new Error("Failiure to fetch coin data");
    } 
    return response.json();

}

export const FetchChartData = async (id) => {
    const response = await fetch(
         `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
    );
    if(!response.ok){
        throw new Error("Failiure to get chart data");
    } 
    return response.json();

}

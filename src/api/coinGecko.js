const BASE_URL = "https://api.coingecko.com/api/v3"

const handleResponse = async (response) => {
    if (response.status === 429) {
        throw new Error("RATE_LIMIT");
    }
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
};

export const FetchCryptos = async () => {
    const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    return handleResponse(response);

}

export const FetchCoinData = async (id) => {
    const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    return handleResponse(response);


}

export const FetchChartData = async (id) => {
    const response = await fetch(
         `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
    );

    return handleResponse(response);


}

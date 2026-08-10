import { useNavigate, useParams } from "react-router";
import { FetchChartData, FetchCoinData } from "../api/coinGecko";
import { useState,useEffect } from "react";
import { formatPrice } from "../utils/formatter";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip } from "recharts";

export const CoinDetail = () => {
   const {id} = useParams();
   const[coin,setCoin] = useState(null);
   const[chartData,setChartData] = useState([]);
   const[isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
    loadCoinData();
    loadChartData();
   },[id])

   const loadCoinData = async () => {
    
    try {
        const data = await FetchCoinData(id);
        setCoin(data);
    } catch (error){
        console.error("Error getting crypto: ",error);
    } finally {
        setIsLoading(false);
    }
}

const loadChartData = async () => {
    try {
        const data = await FetchChartData(id);
        const formatted = data.prices.map((price) => ({
            time: new Date(price[0]).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            }),
            price: price[1].toFixed(2),
        }));
        setChartData(formatted);
    } catch (error){
        console.error("Error getting chart data: ",error);
    }
}
   if (!coin){
    return <div className="app">
        <div className="no-results">
            <p>No coin found</p>
            <button className="back-button" onClick={() => navigate("/")}> Go back </button>
        </div>
    </div>
   }
   return (<div className="app">
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <h1> Crypto Tracker</h1>
                    
                </div>
                    <button className="back-button" onClick={() => navigate("/")}> Go back </button>

            </div>
        </header>

        <div className="coin-detail">
            <div className="coin-header"> 
                <div className="coin-title">
                    <img src={coin.image.large} alt={coin.name} />
                    <div>
                        <h1> {coin.name}</h1>
                        <p className="symbol"> {coin.symbol.toUpperCase()}</p>
                        <div className="rank">#{coin.market_cap_rank}</div>
                    </div>
                </div>
                    <div className="coin-price-section">
                        <div className="current-price">
                            <h2 className="price"> {formatPrice(coin.market_data.current_price.usd)}</h2>
                            <p className={`change-badge ${coin.market_data.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}>
                                {`${coin.market_data.price_change_percentage_24h >= 0 ? " ↑ " : " ↓ "}`}
                                {" "}{Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%</p>
                        </div>
                    </div>
            </div>
            <div className="chart-section">
                <h3>Price CHart(7days)</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>

                            <XAxis 
                             dataKey="time"
                             stroke="#9ca3af"
                             style={{fontSize: "12px"}}/>
                            <YAxis
                             stroke="#9ca3af"
                             style={{fontSize: "12px"}} 
                             domain={["auto","auto"]}/>
                             <Tooltip 
                             />
                            <Line dataKey="price" 
                            type="monotone"
                            stroke="#ADD8E6"
                            strokeWidth={2}
                            dot={false}/>

                        </LineChart>
                    </ResponsiveContainer>
            </div>
        </div>

    </div>)
}
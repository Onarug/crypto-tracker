import { useEffect,useState } from "react";
import { FetchCryptos } from "../api/coinGecko"
import { CryptoCard } from "../components/CryptoCard";

export const Home = () => {
    
    const[cryptoList, setCryptoList] = useState([]);
    const[filteredList, setFilteredList] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[viewMode, setViewMode] = useState("grid");
    const[sortBy,setSortBy] = useState("market_cap_rank");
    const[searchQuery,setSearchQuery] = useState("");
    const[isError,setIsError] = useState("");


    
    useEffect(() => {
        fetchCryptoData();
    },[])

    useEffect(() => {
        filterAndSort()
    },[sortBy,cryptoList,searchQuery])

const fetchCryptoData = async() =>{
    setIsLoading(true);
    setIsError(null);
    try {
        //throw new Error("Failed to fetch");
        const data = await FetchCryptos();
        setCryptoList(data);
    } catch (error){
        console.error("Error getting crypto: ",error);
        if (error.message === "RATE_LIMIT" || error.message === "Failed to fetch") {
            setIsError("Too many requests right now, try again");
        } else {
            setIsError("Something went wrong loading data");
        }
    } finally {
        setIsLoading(false);
    }
};

    const filterAndSort = () => {
        let filtered = cryptoList.filter((crypto) => crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
     || crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
        
        filtered.sort((a,b) => {
            switch(sortBy){
                case "name":
                    return a.name.localeCompare(b.name);
                case "price":
                    return a.current_price - b.current_price;
                case "price_desc":
                    return b.current_price - a.current_price;
                case "change":
                    return a.price_change_percentage_24h - b.price_change_percentage_24h;
                case "market_cap":
                    return a.market_cap - b.market_cap;
                default:
                    return a.market_cap_rank - b.market_cap_rank;

            }
           
        });
         setFilteredList(filtered);

    }

    return (<div className="app">
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <h1> Crypto Tracker</h1>
                </div>
                <div className="search-section">
                    <input type="text"
                     placeholder="Search a coin..."
                     className="search-input"
                     onChange={(e) => setSearchQuery(e.target.value)}
                     value={searchQuery}/>
                </div>
            </div>
        </header>
        <div className="controls">
            <div className="filter-group">
                <label>Sort By: </label>
                <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value) }>
                    <option value="market_cap_rank">Rank</option>
                    <option value="name">Name</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="change">Change in 24 Hours</option>
                    <option value="market_cap">Market Cap</option>

                </select>
            </div>
            <div className="view-toggle">
                <button className={viewMode === "grid" ? "active" :""}
                onClick={() => setViewMode("grid")}>Grid</button>
                <button className={viewMode === "list" ? "active" :""}
                onClick={() => setViewMode("list")}>List</button>
            </div>


        </div>
        {
        isError ? (
            <div className="no-results">
                <p>{isError}</p>
                <button className="back-button" onClick={fetchCryptoData}>Retry</button>
            </div>
        ) : isLoading ? 
            
            <div className="loading">
                <div className="spinner">
                    <p> Loading Data</p>
                </div>
            </div> : 
            <div className={`crypto-container ${viewMode}`}>
                {filteredList.map((crypto,key) => (
                    <CryptoCard crypto={crypto} key={key} alt={crypto.name} />
                )

                )}
            </div>
        } </div>)
}
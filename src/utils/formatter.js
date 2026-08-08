export const formatPrice = (price) =>{
    if(price < 0.01){
        return price.toFixed(8);
    } else {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits : 2
        }).format(price);
    }
}

// Found online

export const formatMarketCap = (num) =>{
    if (num === null || num === undefined) return '0';
  if (num === 0) return '0';

  const suffixes = ['', 'K', 'M', 'B', 'T', 'P'];
  const i = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  if (i === 0) return num.toString();
  
  const scaled = num / Math.pow(10, i * 3);
  return scaled.toFixed(2) + suffixes[i];
}
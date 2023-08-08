const CurrencyFormat = ({price})=>{
    return Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:"INR",
        maximumFractionDigits:2,
    }).format(price*10);
};

export default CurrencyFormat
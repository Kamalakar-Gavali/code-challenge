import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from "react-select";

export default function CurrencySwapForm() {
  const [tokens, setTokens] = useState([]);
  const [prices, setPrices] = useState([]);
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [estimated, setEstimated] = useState('');


  // Fetch prices
  useEffect(() => {
    axios.get('https://interview.switcheo.com/prices.json')
      .then(res => setPrices(res.data))
      .catch(err => console.error(err));
  }, []);

    // Create Token list
  useEffect(() => {
     
    const tokenOptions = prices?.map(token => ({
      value: token.currency,
      price: token.price,
      label: token.currency,
      image: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`,
    }));
    
    setTokens(tokenOptions);
    
  }, [prices]);

  
useEffect(() => {
  setEstimated('');
}, [fromToken, toToken, amount]);


const handleSwap = () => {
  if (!fromToken || !toToken || !amount || amount <= 0) {
    alert("Please enter valid inputs");
    return;
  }

  if (!fromToken.price || !toToken.price) {
    alert("Price not available for selected token");
    return;
  }

  // compute
  const rate = (amount*fromToken.price)/toToken.price;
  const estimatedAmount = (rate).toFixed(6);

  setEstimated(estimatedAmount);
};


  return (
    <div className="container">
      <h2>Currency Swap</h2>

      <div className="form-group">
        <label>From</label>
        <Select
      options={tokens}
      onChange={(token)=>{setFromToken(token)}}
      formatOptionLabel={(option) => (
        <div key={option.currency} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={option.image}
            alt=""
            width="20"
            height="20"
            style={{ borderRadius: "3px" }}
          />
          <span>{option.label}</span>
        </div>
      )}
    />
      </div>

      <div className="form-group">
        <label>To</label>
        <Select
      options={tokens}
      onChange={(token)=>{setToToken(token)}}
      formatOptionLabel={(option,index) => (
        <div key={option.currency+index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={option.image}
            alt=""
            width="20"
            height="20"
            style={{ borderRadius: "3px" }}
          />
          <span>{option.label}</span>
        </div>
      )}
    />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      {estimated && (
        <div className="estimate">
          Estimated: <strong>{`${amount} ${fromToken.value} → ${estimated} ${toToken.value}`}</strong>
        </div>
      )}

      <button onClick={handleSwap}>Swap</button>
    </div>
  );
}

import React from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./currencyRow.css";

export const CurrencyRow = () => {
  // the url from fixer.io that fetches only USD, EUR and CHF
  const BASE_URL =
    "http://api.exchangeratesapi.io/v1/latest?access_key=6493375e88c195380deff9124a1dbcc3&symbols=USD,CHF,EUR&format=1";

  // all the use state hooks that have been used
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(""); //remove the zero
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [output, setOutput] = useState(0);

  // the empty list 
  const list = []
  // current date 
  const current = new Date();
  const month =  current.toLocaleString('default', { month: 'long' })


  // list of items that will be saved in the local storage, including date,amount,from,to and output
  const items = {
    date:`${month} ${current.getDate()},${current.getFullYear()}`,
    amount: `${amount}`,
    fromCurrency: `${fromCurrency}`,
    toCurrency: `${toCurrency}`,
    output: `${output}`,
  };

   // pushing different converted currency to the list 
   list.push(items)
  // adding the items list with data
  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items));
   
  });
 

  // getting the data back from the localstorage
  useEffect(() => {
    JSON.parse(window.localStorage.getItem("items"));
  });

  // fetching the api data and res from the api url it self
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  //  fetching the from and to currency
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  // handling the the amount change from
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  // handling the the amount change to
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  // Function to convert the currency
  function convert() {
    let toAmount, fromAmount;
    if (amountInFromCurrency) {
      fromAmount = amount;
      setOutput(fromAmount);
      toAmount = amount * exchangeRate;
      setOutput(toAmount);
      handleFromAmountChange();
    } else {
      toAmount = amount;
      setOutput(toAmount);
      fromAmount = amount / exchangeRate;
      setOutput(fromAmount);
      handleToAmountChange();
    }
  }

  // Function to switch between two currency
  function flip() {
    var temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  // all functions are handled in one function
  // which will be called once the convert button is pressed
  function handleChange() {
    convert();
  }

  return (
    <div className="currency-row" id="back">
      <div className="heading">
        {/* add the image here  */}
        <img
          className="hatch-img"
          src="https://hatch.studio/wp-content/uploads/2020/12/hatch_studio-logo_combination-white.png"
          alt=""
        />

        <h1 className="title">Convert currencies in real-time.</h1>
      </div>
      <div className="container">
        {/* insert the amount, from and to here to make the card */}
        <div className="card">
          <div className="left">
            <h3 className="amount-text">Amount</h3>
            <input
              className="amount-input"
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="middle">
            <h3 className="from"> From</h3>
            <select
              options={currencyOptions}
              onChange={(e) => {
                setFromCurrency(e.target.value);
              }}
              value={fromCurrency}
              placeholder="From"
              class="select-from"
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="switch">
            <HiSwitchHorizontal
              className="SearchIcon"
              color="yellow"
              size="30px"
              onClick={(e) => {
                flip(e);
              }}
            />
          </div>
          <div className="right">
            <h3 className="to">To</h3>
            <select
              options={currencyOptions}
              onChange={(e) => {
                setToCurrency(e.target.value);
              }}
              value={toCurrency}
              placeholder="To"
              class="select-to"
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="button-class">
            <button id="input" className="convert-btn" onClick={handleChange}>
              Convert
            </button>
          </div>
        </div>
      </div>

      {/* result */}
      <div className="result">
        {/* passing in the usestate input,form ... */}
        <p className="amount">{amount + " " + fromCurrency + " = "}</p>
        <p className="total" value={output} placeholder="Result">
          {output.toFixed(5) + " " + toCurrency}
        </p>
      </div>

      <div className="right">
        <div className="right-button">
          <a>
            <Link to="/forward"> View conversion history ></Link>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRow;

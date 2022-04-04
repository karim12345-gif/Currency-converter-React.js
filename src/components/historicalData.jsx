import React from "react";
import "./historicaldata.css";
import { Link } from "react-router-dom";

export const historicalData = () => {

  // retrieving the data from localstorage from list called items using GetItem
  // then displaying them in the table 
  const data = JSON.parse(localStorage.getItem('items'))
  const amount = data.amount
  const from = data.fromCurrency
  const to = data.toCurrency
  const output = data.output
  const date = data.date

  return (
    <div className="historical" id="historicalData" title="historicalData">
      {/* add the image here  */}
      <img
        className="hatch-img1"
        src="https://hatch.studio/wp-content/uploads/2020/12/hatch_studio-logo_combination-white.png"
        alt=""
      />

      <table>
        <tr>
         
          <th>Date</th>
          <th>From</th>
          <th>To</th>
        </tr>
        <tr>
     
             <td>{date}</td>
            <td>{amount +''+ from }</td>
            <td>{output + "" + to }</td>
        
        </tr>
        
      
      
      </table>

        
      <a className="backbtn" >
            <Link to="/back"> Go back </Link>
          </a>

     
    </div>
  );
};

export default historicalData;

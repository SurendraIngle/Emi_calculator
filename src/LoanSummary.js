import React from "react";
import "./LoanSummary.css";

const LoanSummary = ({summaryData,summaryData1,emi}) => {
  // const summaryData = [
  //   { label: "Principal amount", amount: "₹20,00,000", color: "#8B0000" }, // Dark Red
  //   { label: "Interest amount", amount: "₹96,054", color: "#FFA500" }, // Orange
  //   { label: "Total amount payable", amount: "₹20,96,054", color: "#2F4F4F" }, // Dark Slate Gray
  // ];
  // const summaryData1 = [
  //   { label: "Principal amount1", amount: "₹20,00,000", color: "#8B0000" }, // Dark Red
  //   { label: "Interest amount1", amount: "₹96,054", color: "#FFA500" }, // Orange
  //   { label: "Total amount payable1", amount: "₹20,96,054", color: "#2F4F4F" }, // Dark Slate Gray
  // ];

  return (
    <div className="loan-summary">
      <div className="loan-summary-container1">
        <div>
          {summaryData !== null ?summaryData.map((item, index) => (
            <div key={index} className="loan-summary-item">
              <div
                className="loan-summary-item-square"
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <div className="loan-summary-item-label">{item.label}</div>
                <div className="loan-summary-item-amount">{item.amount}</div>
              </div>
            </div>
          )):[]}
        </div>
        <div>
          {summaryData1 !== null ?summaryData1.map((item, index) => (
            <div key={index} className="loan-summary-item">
              <div
                className="loan-summary-item-square"
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <div className="loan-summary-item-label">{item.label}</div>
                <div className="loan-summary-item-amount">{item.amount}</div>
              </div>
            </div>
          )):[]}
        </div>
      </div>
      <div class="emi-banner">
        <p class="emi-text">Your Monthly EMI is ₹{emi}</p>
      </div>
    </div>
  );
};

export default LoanSummary;

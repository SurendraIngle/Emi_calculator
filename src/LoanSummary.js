import React from "react";
import "./LoanSummary.css";

const LoanSummary = ({summaryData,summaryData1,emi}) => {

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
        <p class="emi-text">{emi!==null?`Your Monthly EMI is ₹${emi}`:""}</p>
      </div>
    </div>
  );
};

export default LoanSummary;

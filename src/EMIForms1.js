import React, { useState, useCallback } from "react";
import { calculateEmi } from "./calculator";
import RepaymentSchedule from "./RepaymentSchedule";
import DoubleDoughnutChart from "./PieChart";
import RangeSlider from "./RangeSlider";
import "./App.css";
import LoanSummary from "./LoanSummary";

const LOAN_CONSTANTS = Object.freeze(
  new Map([
    ["PERSONAL_LOAN_MIN", 50000],
    ["PERSONAL_LOAN_MAX", 2500000],
    ["PERSONAL_LOAN_INTEREST_MIN", 10],
    ["PERSONAL_LOAN_INTEREST_MAX", 24],
    ["PERSONAL_LOAN_TENURE_MIN", 1],
    ["PERSONAL_LOAN_TENURE_MAX", 5],
    ["HOME_LOAN_MIN", 100000],
    ["HOME_LOAN_MAX", 500000000],
    ["HOME_LOAN_INTEREST_MIN", 8],
    ["HOME_LOAN_INTEREST_MAX", 20],
    ["HOME_LOAN_TENURE_MIN", 2],
    ["HOME_LOAN_TENURE_MAX", 30],
    ["CAR_LOAN_MIN", 500000],
    ["CAR_LOAN_MAX", 1500000],
    ["CAR_LOAN_TENURE_MIN", 1],
    ["CAR_LOAN_TENURE_MAX", 7],
    ["CAR_LOAN_INTEREST_MIN", 7],
    ["CAR_LOAN_INTEREST_MAX", 15],
    ["LOAN_AMOUNT_STEP", 50000],
    ["INTEREST_RATE_STEP", 0.01],
    ["TENURE_STEPS", 1],
    ["RS_SIGN", "₹"],
    ["PERCENT_SIGN", "%"],
    ["PERIOD_SIGN", "years"],
  ])
);

const EMIForm = ({ loanType, onCalculateEmi, loanDetails, onUpdate }) => {
  const [loanAmount, setLoanAmount] = useState(
    LOAN_CONSTANTS.get(`${loanType}_LOAN_MIN`)
  );
  const [interestRate, setInterestRate] = useState(
    LOAN_CONSTANTS.get(`${loanType}_LOAN_INTEREST_MIN`)
  );
  const [tenure, setTenure] = useState(
    LOAN_CONSTANTS.get(`${loanType}_LOAN_TENURE_MIN`)
  );
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateClick = useCallback(() => {
    setError(null);
    try {
      const loanDetail = {
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure),
      };
      const response = calculateEmi(loanDetail);
      setEmi(response.emi);
      onCalculateEmi({
        ...loanDetail,
        emi: response.emi,
      });
    } catch (error) {
      console.error("Error calculating EMI:", error);
      setError("Error calculating EMI.");
    }
  }, [loanAmount, interestRate, tenure, onCalculateEmi]);

  // const pieChartData = [
  //   { value: loanAmount, label: "Loan Amount" },
  //   { value: emi, label: "EMI" },
  //   { value: tenure * 500, label: "Tenure" },
  //   { value: interestRate * 500, label: "Interest Rate" },
  // ];
  const amountToPaid = emi * tenure * 12;
  const totalInterest = amountToPaid - loanAmount;
  const outerData = {
    datasets: [
      {
        data: [loanAmount, totalInterest, 25, 25],
        backgroundColor: ["#8B0000", "#FFA500"],
        borderWidth: 2,
      },
    ],
  };
  const innerData = {
    datasets: [
      {
        data: [loanAmount, totalInterest, 25, 25],
        backgroundColor: ["#6a0dad", "#1e90ff"],
        borderWidth: 2,
      },
    ],
  };
  const summaryData = [
    { label: "Principal amount", amount: loanAmount, color: "#8B0000" }, // Dark Red
    { label: "Interest amount", amount: totalInterest, color: "#FFA500" }, // Orange
    { label: "Total amount payable", amount: amountToPaid, color: "#2F4F4F" }, // Dark Slate Gray
  ];
  const summaryData1 = [
    { label: "Principal amount1", amount: loanAmount, color: "#8B0000" }, // Dark Red
    { label: "Interest amount1", amount: totalInterest, color: "#FFA500" }, // Orange
    { label: "Total amount payable1", amount: amountToPaid, color: "#2F4F4F" }, // Dark Slate Gray
  ];
  return (
    <div>
      <div className="float-container">
        <div className="form-container">
          <h2>Calculate EMI</h2>
          <form>
            <RangeSlider
              min={LOAN_CONSTANTS.get(`${loanType}_LOAN_MIN`)}
              max={LOAN_CONSTANTS.get(`${loanType}_LOAN_MAX`)}
              step={LOAN_CONSTANTS.get("LOAN_AMOUNT_STEP")}
              initialValue={LOAN_CONSTANTS.get(`${loanType}_LOAN_MIN`)}
              label="Loan Amount"
              sign={LOAN_CONSTANTS.get("RS_SIGN")}
              onChange={setLoanAmount}
            />
            <RangeSlider
              min={LOAN_CONSTANTS.get(`${loanType}_LOAN_INTEREST_MIN`)}
              max={LOAN_CONSTANTS.get(`${loanType}_LOAN_INTEREST_MAX`)}
              step={LOAN_CONSTANTS.get("INTEREST_RATE_STEP")}
              initialValue={LOAN_CONSTANTS.get(`${loanType}_LOAN_INTEREST_MIN`)}
              label="Interest Rate"
              sign={LOAN_CONSTANTS.get("PERCENT_SIGN")}
              onChange={setInterestRate}
            />
            <RangeSlider
              min={LOAN_CONSTANTS.get(`${loanType}_LOAN_TENURE_MIN`)}
              max={LOAN_CONSTANTS.get(`${loanType}_LOAN_TENURE_MAX`)}
              step={LOAN_CONSTANTS.get("TENURE_STEPS")}
              initialValue={LOAN_CONSTANTS.get(`${loanType}_LOAN_TENURE_MIN`)}
              label="Tenure"
              sign={LOAN_CONSTANTS.get("PERIOD_SIGN")}
              onChange={setTenure}
            />
            <button type="button" onClick={handleCalculateClick}>
              Calculate EMI
            </button>
            {error && <p className="error">{error}</p>}
          </form>
          <div>{emi !== null ? `EMI: ${emi}` : ""}</div>
        </div>
        <div className="emi-display">
          <DoubleDoughnutChart outerData={outerData} innerData={innerData} />
          <LoanSummary
            summaryData={summaryData}
            summaryData1={summaryData1}
            emi={emi}
          />
        </div>
      </div>
      <div>
        {loanDetails && (
          <RepaymentSchedule onUpdate={onUpdate} loanDetails={loanDetails} />
        )}
      </div>
    </div>
  );
};

const PersonalEMIForm = (props) => <EMIForm loanType="PERSONAL" {...props} />;
const HomeEMIForm = (props) => <EMIForm loanType="HOME" {...props} />;
const CarEMIForm = (props) => <EMIForm loanType="CAR" {...props} />;

export { PersonalEMIForm, HomeEMIForm, CarEMIForm };

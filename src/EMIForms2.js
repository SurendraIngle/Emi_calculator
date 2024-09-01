import React, { useState } from "react";
import { calculateEmi } from "./calculator";
import RangeSlider from "./RangeSlider";
import "./App.css";

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

const EMIForm = ({ loanType, constants }) => {
  const [loanDetails, setLoanDetails] = useState({
    loanAmount: constants.get(`${loanType}_MIN`),
    interestRate: constants.get(`${loanType}_INTEREST_MIN`),
    tenure: constants.get(`${loanType}_TENURE_MIN`),
  });
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateClick = () => {
    setError(null);
    try {
      const response = calculateEmi(loanDetails);
      setEmi(response.emi);
    } catch (error) {
      console.error("Error calculating EMI:", error);
      setError("Error calculating EMI.");
    }
  };

  const handleSliderChange = (name, value) => {
    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="float-container">
      <div className="form-container">
        <h2>Calculate {loanType.replace("_", " ")} EMI</h2>
        <form>
          <RangeSlider
            min={constants.get(`${loanType}_MIN`)}
            max={constants.get(`${loanType}_MAX`)}
            step={constants.get("LOAN_AMOUNT_STEP")}
            initialValue={loanDetails.loanAmount}
            label="Loan Amount"
            sign={constants.get("RS_SIGN")}
            onChange={(value) => handleSliderChange("loanAmount", value)}
          />
          <RangeSlider
            min={constants.get(`${loanType}_INTEREST_MIN`)}
            max={constants.get(`${loanType}_INTEREST_MAX`)}
            step={constants.get("INTEREST_RATE_STEP")}
            initialValue={loanDetails.interestRate}
            label="Interest Rate"
            sign={constants.get("PERCENT_SIGN")}
            onChange={(value) => handleSliderChange("interestRate", value)}
          />
          <RangeSlider
            min={constants.get(`${loanType}_TENURE_MIN`)}
            max={constants.get(`${loanType}_TENURE_MAX`)}
            step={constants.get("TENURE_STEPS")}
            initialValue={loanDetails.tenure}
            label="Tenure"
            sign={constants.get("PERIOD_SIGN")}
            onChange={(value) => handleSliderChange("tenure", value)}
          />
          <button type="button" onClick={handleCalculateClick}>
            Calculate EMI
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <div className="emi-display">{emi !== null ? `EMI: ${emi}` : ""}</div>
      </div>
    </div>
  );
};

const PersonalEMIForm = () => (
  <EMIForm loanType="PERSONAL_LOAN" constants={LOAN_CONSTANTS} />
);

const HomeEMIForm = () => (
  <EMIForm loanType="HOME_LOAN" constants={LOAN_CONSTANTS} />
);

const CarEMIForm = () => (
  <EMIForm loanType="CAR_LOAN" constants={LOAN_CONSTANTS} />
);

export { PersonalEMIForm, HomeEMIForm, CarEMIForm };

import React, { useState } from "react";
import { calculateEmi } from "./calculator";
import RepaymentSchedule from "./RepaymentSchedule";
import PieChartWithCenterLabel from "./PieChart";
import RangeSlider from "./RangeSlider";
// import ColorTabs from "./Panel";
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
// const PersonalEMIForm = ({ onCalculateEmi }) => {
const PersonalEMIForm = ({ onCalculateEmi, loanDetails, onUpdate }) => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(1);
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateClick = async () => {
    setError(null); // Reset error state
    try {
      const loanDetail = {
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure),
      };
      console.log("loan", loanDetail);
      const response = calculateEmi(loanDetail);
      //    console.log("Response ", response);
      setEmi(response.emi); // Update the EMI state

      onCalculateEmi({
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure, 8),
        emi: response.emi,
      });

      // navigate("/repayment-schedule");
    } catch (error) {
      console.error("Error calculating EMI:", error);
      setError("Error calculating EMI.");
    }
  };
  const pieChartData = [
    { value: loanAmount, label: "A" },
    { value: emi, label: "B" },
    { value: tenure * 500, label: "C" },
    { value: interestRate * 500, label: "D" },
  ];
  const handleSliderChange = (value) => {
    setLoanAmount(parseFloat(value));
  };
  const handleSliderChangetenure = (value) => {
    //  console.log("tenureinput ",value);
    setTenure(value);
  };
  const handleSliderChangerate = (value) => {
    setInterestRate(value);
  };
  return (
    <>
      <div className="float-container">
        <div className="form-container">
          <h2>Calculate EMI</h2>
          <form>
            <RangeSlider
              min={LOAN_CONSTANTS.get("PERSONAL_LOAN_MIN")}
              max={LOAN_CONSTANTS.get("PERSONAL_LOAN_MAX")}
              step={LOAN_CONSTANTS.get("LOAN_AMOUNT_STEP")}
              initialValue={LOAN_CONSTANTS.get("PERSONAL_LOAN_MIN")}
              label="Loan Amount"
              sign={LOAN_CONSTANTS.get("RS_SIGN")}
              onChange={handleSliderChange}
            />
            {
              <RangeSlider
                min={LOAN_CONSTANTS.get("PERSONAL_LOAN_INTEREST_MIN")}
                max={LOAN_CONSTANTS.get("PERSONAL_LOAN_INTEREST_MAX")}
                step={LOAN_CONSTANTS.get("INTEREST_RATE_STEP")}
                initialValue={LOAN_CONSTANTS.get("PERSONAL_LOAN_INTEREST_MIN")}
                label="Interest Rate"
                sign={LOAN_CONSTANTS.get("PERCENT_SIGN")}
                onChange={handleSliderChangerate}
              />
            }
            <RangeSlider
              min={LOAN_CONSTANTS.get("PERSONAL_LOAN_TENURE_MIN")}
              max={LOAN_CONSTANTS.get("PERSONAL_LOAN_TENURE_MAX")}
              step={LOAN_CONSTANTS.get("TENURE_STEPS")}
              initialValue={LOAN_CONSTANTS.get("PERSONAL_LOAN_TENURE_MIN")}
              label="tenure"
              sign={LOAN_CONSTANTS.get("PERIOD_SIGN")}
              onChange={handleSliderChangetenure}
            />
            <button type="button" onClick={handleCalculateClick}>
              Calculate EMI
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          <div className="emi-display">{emi !== null ? `EMI: ${emi}` : ""}</div>
        </div>
        <div className="emi-display">
          <h1>Pie Chart with Center Label</h1>
          <PieChartWithCenterLabel
            data={pieChartData}
            label={`Total Emi: ${emi}`}
          />
        </div>
      </div>
      <div>
        {loanDetails && (
          <RepaymentSchedule onUpdate={onUpdate} loanDetails={loanDetails} />
        )}
      </div>
    </>
  );
};
{
  /* <div>Personal EMI Form</div>; */
}
// const HomeEMIForm = () => {
  const HomeEMIForm = ({ onCalculateEmi, loanDetails, onUpdate}) =>{
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(6);
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateClick = async () => {
    setError(null); // Reset error state
    try {
      const loanDetail = {
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure),
      };
      //   console.log("loan", loanDetail);
      const response = calculateEmi(loanDetail);
      //    console.log("Response ", response);
      setEmi(response.emi); // Update the EMI state

        onCalculateEmi({
          loanAmount: parseFloat(loanAmount),
          interestRate: parseFloat(interestRate),
          tenure: parseInt(tenure, 8),
          emi: response.emi,
        });

      // navigate("/repayment-schedule");
    } catch (error) {
      console.error("Error calculating EMI:", error);
      setError("Error calculating EMI.");
    }
  };
    const pieChartData = [
      { value: loanAmount, label: "A" },
      { value: emi, label: "B" },
      { value: tenure * 500, label: "C" },
      { value: interestRate * 500, label: "D" },
    ];
  const handleSliderChange = (value) => {
    setLoanAmount(value);
  };
  const handleSliderChangetenure = (value) => {
    //  console.log("tenureinput ",value);
    setTenure(value);
  };
  const handleSliderChangerate = (value) => {
    setInterestRate(value);
  };
  return (
    <>
      <div className="float-container">
        <div className="form-container">
          <h2>Calculate EMI</h2>
          <form>
            <RangeSlider
              min={LOAN_CONSTANTS.get("HOME_LOAN_MIN")}
              max={LOAN_CONSTANTS.get("HOME_LOAN_MAX")}
              step={LOAN_CONSTANTS.get("LOAN_AMOUNT_STEP")}
              initialValue={LOAN_CONSTANTS.get("HOME_LOAN_MIN")}
              label="Loan Amount"
              sign={LOAN_CONSTANTS.get("RS_SIGN")}
              onChange={handleSliderChange}
            />
            {
              <RangeSlider
                min={LOAN_CONSTANTS.get("HOME_LOAN_INTEREST_MIN")}
                max={LOAN_CONSTANTS.get("HOME_LOAN_INTEREST_MAX")}
                step={LOAN_CONSTANTS.get("INTEREST_RATE_STEP")}
                initialValue={LOAN_CONSTANTS.get("HOME_LOAN_INTEREST_MIN")}
                label="Interest Rate"
                sign={LOAN_CONSTANTS.get("PERCENT_SIGN")}
                onChange={handleSliderChangerate}
              />
            }
            <RangeSlider
              min={LOAN_CONSTANTS.get("HOME_LOAN_TENURE_MIN")}
              max={LOAN_CONSTANTS.get("HOME_LOAN_TENURE_MAX")}
              step={LOAN_CONSTANTS.get("TENURE_STEPS")}
              initialValue={LOAN_CONSTANTS.get("HOME_LOAN_TENURE_MIN")}
              label="tenure"
              sign={LOAN_CONSTANTS.get("PERIOD_SIGN")}
              onChange={handleSliderChangetenure}
            />
            <button type="button" onClick={handleCalculateClick}>
              Calculate EMI
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          <div className="emi-display">{emi !== null ? `EMI: ${emi}` : ""}</div>
        </div>
        <div className="emi-display">
          <h1>Pie Chart with Center Label</h1>
          <PieChartWithCenterLabel
            data={pieChartData}
            label={`Total Emi: ${emi}`}
          />
        </div>
      </div>
      <div>
        {loanDetails && (
          <RepaymentSchedule onUpdate={onUpdate} loanDetails={loanDetails} />
        )}
      </div>
    </>
  );
};
const CarEMIForm = ({ onCalculateEmi, loanDetails, onUpdate }) => {
  // const PersonalEMIForm = ({ onCalculateEmi, loanDetails, onUpdate}) =>
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(6);
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateClick = async () => {
    setError(null); // Reset error state
    try {
      const loanDetail = {
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure),
      };
      console.log("loan", loanDetail);
      const response = calculateEmi(loanDetail);
      console.log("Response ", response);
      setEmi(response.emi); // Update the EMI state

      onCalculateEmi({
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure, 8),
        emi: response.emi,
      });

      // navigate("/repayment-schedule");
    } catch (error) {
      console.error("Error calculating EMI:", error);
      setError("Error calculating EMI.");
    }
  };
    const pieChartData = [
      { value: loanAmount, label: "A" },
      { value: emi, label: "B" },
      { value: tenure * 500, label: "C" },
      { value: interestRate * 500, label: "D" },
    ];
  const handleSliderChange = (value) => {
    setLoanAmount(value);
  };
  const handleSliderChangetenure = (value) => {
    //  console.log("tenureinput ",value);
    setTenure(value);
  };
  const handleSliderChangerate = (value) => {
    setInterestRate(value);
  };
  return (
    <>
      <div className="float-container">
        <div className="form-container">
          <h2>Calculate EMI</h2>
          <form>
            <RangeSlider
              min={LOAN_CONSTANTS.get("CAR_LOAN_MIN")}
              max={LOAN_CONSTANTS.get("CAR_LOAN_MAX")}
              step={LOAN_CONSTANTS.get("LOAN_AMOUNT_STEP")}
              initialValue={LOAN_CONSTANTS.get("CAR_LOAN_MIN")}
              label="Loan Amount"
              sign={LOAN_CONSTANTS.get("RS_SIGN")}
              onChange={handleSliderChange}
            />
            {
              <RangeSlider
                min={LOAN_CONSTANTS.get("CAR_LOAN_INTEREST_MIN")}
                max={LOAN_CONSTANTS.get("CAR_LOAN_INTEREST_MAX")}
                step={LOAN_CONSTANTS.get("INTEREST_RATE_STEP")}
                initialValue={LOAN_CONSTANTS.get("CAR_LOAN_INTEREST_MIN")}
                label="Interest Rate"
                sign={LOAN_CONSTANTS.get("PERCENT_SIGN")}
                onChange={handleSliderChangerate}
              />
            }
            <RangeSlider
              min={LOAN_CONSTANTS.get("CAR_LOAN_TENURE_MIN")}
              max={LOAN_CONSTANTS.get("CAR_LOAN_TENURE_MAX")}
              step={LOAN_CONSTANTS.get("TENURE_STEPS")}
              initialValue={LOAN_CONSTANTS.get("CAR_LOAN_TENURE_MIN")}
              label="tenure"
              sign={LOAN_CONSTANTS.get("PERIOD_SIGN")}
              onChange={handleSliderChangetenure}
            />
            <button type="button" onClick={handleCalculateClick}>
              Calculate EMI
            </button>
            {error && <p className="error">{error}</p>}
          </form>

          <div className="emi-display">{emi !== null ? `EMI: ${emi}` : ""}</div>
        </div>
        <div className="emi-display">
          <h1>Pie Chart with Center Label</h1>
          <PieChartWithCenterLabel
            data={pieChartData}
            label={`Total Emi: ${emi}`}
          />
        </div>
      </div>
      <div>
        {loanDetails && (
          <RepaymentSchedule onUpdate={onUpdate} loanDetails={loanDetails} />
        )}
      </div>
    </>
  );
};

export { PersonalEMIForm, HomeEMIForm, CarEMIForm };

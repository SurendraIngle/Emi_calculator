import React, { useState, useEffect, useCallback } from "react";
import { calculateSIP } from "./SIPCalculations";
import DoubleDoughnutChart from "./PieChart";
import RangeSlider from "./RangeSlider";
import "./App.css";
import LoanSummary from "./LoanSummary";

const SIP_CONSTANTS = Object.freeze({
  SIP_MONTH_MIN: 1000,
  SIP_MONTH_MAX: 1000000,
  SIP_INTEREST_MIN: 10,
  SIP_INTEREST_MAX: 30,
  SIP_TENURE_MIN: 1,
  SIP_TENURE_MAX: 40,
  SIP_AMOUNT_STEP: 50000,
  INTEREST_RATE_STEP: 1,
  TENURE_STEPS: 1,
  RS_SIGN: "₹",
  PERCENT_SIGN: "%",
  PERIOD_SIGN: "years",
  MONTHLY_LABEL: "Monthly Investment",
  QUARTERLY_LABEL: "Quarterly Investment",
  ONETIME_LABEL: "One Time Investment",
  MONTHLY_GOAL_LABEL: "Goal Amount",
  QUARTERLY_GOAL_LABEL: "",
});

const SIPForm = ({ sipType }) => {
  const [sipAmount, setSipAmount] = useState(SIP_CONSTANTS.SIP_MONTH_MIN);
  const [interestRate, setInterestRate] = useState(
    SIP_CONSTANTS.SIP_INTEREST_MIN
  );
  const [tenure, setTenure] = useState(SIP_CONSTANTS.SIP_TENURE_MIN);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estReturn, setEstReturn] = useState(0);
  const [error, setError] = useState(null);

  const calculateAndSetSIP = useCallback(() => {
    setError(null);
    try {
      const sipDetails = {
        sipAmount: parseFloat(sipAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure),
      };
    
      const response = calculateSIP(sipDetails, sipType);
      setTotalAmount(response.totalAmount);
      setEstReturn(response.estReturn);
      setTotalInvestment(response.totalInvestment);
    } catch (err) {
      console.error("Error calculating SIP:", err);
      setError("Error calculating SIP.");
    }
  }, [sipAmount, interestRate, tenure, sipType]);

  useEffect(() => {
    calculateAndSetSIP();
  }, []);

  const chartData = {
    datasets: [
      {
        data: [totalInvestment, estReturn],
        backgroundColor: ["#8B0000", "#FFA500"],
        borderWidth: 2,
      },
    ],
  };

  const summaryData = [
    { label: "Invested amount", amount: totalInvestment, color: "#8B0000" },
    { label: "Est. Return", amount: estReturn, color: "#FFA500" },
    { label: "Total amount", amount: totalAmount, color: "#2F4F4F" },
  ];

  return (
    <div>
      <div className="float-container">
        <div className="form-container">
          <h2>SIP Calculator</h2>
          <form>
            <RangeSlider
              min={SIP_CONSTANTS.SIP_MONTH_MIN}
              max={SIP_CONSTANTS.SIP_MONTH_MAX}
              step={SIP_CONSTANTS.SIP_AMOUNT_STEP}
              initialValue={sipAmount}
              label={SIP_CONSTANTS[`${sipType}_LABEL`]}
              sign={SIP_CONSTANTS.RS_SIGN}
              onChange={setSipAmount}
            />
            <RangeSlider
              min={SIP_CONSTANTS.SIP_INTEREST_MIN}
              max={SIP_CONSTANTS.SIP_INTEREST_MAX}
              step={SIP_CONSTANTS.INTEREST_RATE_STEP}
              initialValue={interestRate}
              label="Expected Return Rate"
              sign={SIP_CONSTANTS.PERCENT_SIGN}
              onChange={setInterestRate}
            />
            <RangeSlider
              min={SIP_CONSTANTS.SIP_TENURE_MIN}
              max={SIP_CONSTANTS.SIP_TENURE_MAX}
              step={SIP_CONSTANTS.TENURE_STEPS}
              initialValue={tenure}
              label="Time Period"
              sign={SIP_CONSTANTS.PERIOD_SIGN}
              onChange={setTenure}
            />
            <button type="button" onClick={calculateAndSetSIP}>
              Calculate SIP
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
        <div className="emi-display">
          <DoubleDoughnutChart outerData={chartData} innerData={null} />
          <LoanSummary
            summaryData={summaryData}
            summaryData1={null}
            emi={null}
          />
        </div>
      </div>
    </div>
  );
};

const MonthlySIPForm = () => <SIPForm sipType="MONTHLY" />;
const QuarterlySIPForm = () => <SIPForm sipType="QUARTERLY" />;
const OneTimeSIPForm = () => <SIPForm sipType="ONETIME" />;
const MonthlyGoalSIPForm = () => <SIPForm sipType="MONTHLY_GOAL" />;
const QuarterlyGoalSIPForm = () => <SIPForm sipType="QUARTERLY_GOAL" />;
const YearlySIPForm = () => <SIPForm sipType="YEARLY" />;

export { MonthlySIPForm, QuarterlySIPForm, OneTimeSIPForm ,YearlySIPForm,MonthlyGoalSIPForm,QuarterlyGoalSIPForm };

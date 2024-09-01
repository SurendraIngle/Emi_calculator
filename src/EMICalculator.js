import React, { useState } from "react";
import { calculateEmi } from "./calculator";
import RepaymentSchedule from './RepaymentSchedule';
import PieChartWithCenterLabel from './PieChartPricipal';
import RangeSlider from './RangeSlider';
import './App.css';

const EMIForm = ({ onCalculateEmi, loanDetails, onUpdate }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState(null);
  // const navigate = useNavigate(); // Initialize useNavigate

  const handleCalculateClick = async () => {
    setError(null); // Reset error state
    try {
      const loanDetail = {
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure, 10)
      };
      const response = calculateEmi(loanDetail);
      console.log("Response ", response);
      setEmi(response.emi); // Update the EMI state

      onCalculateEmi({
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        tenure: parseInt(tenure, 10),
        emi: response.emi
      });

      // navigate("/repayment-schedule");
    } catch (error) {
      console.error("Error calculating EMI:", error);
      setError("Error calculating EMI.");
    }
  };
  const pieChartData = [
    { value: loanAmount, label: 'A' },
    { value: emi, label: 'B' },
    { value: tenure * 10, label: 'C' },
    { value: interestRate * 10, label: 'D' },
  ];
  return (
    <>
      <div className="float-container">
          <div className="form-container">
            <h2>Calculate EMI</h2>
            <form>
              <label>
                Loan Amount:
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </label>
              <label>
                Interest Rate (%):
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </label>
              <label>
                Tenure (Months):
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </label>
              <button type="button" onClick={handleCalculateClick}>
                Calculate EMI
              </button>
              {error && <p className="error">{error}</p>}
            </form>

            {/* <div className="emi-display">{emi !== null ? `EMI: ${emi}` : ''}</div> */}
        </div>
        <div className="emi-display">
          <h1>Pie Chart with Center Label</h1>
          <PieChartWithCenterLabel data={pieChartData} label={`Total Emi: ${emi}`} />
        </div>
      </div>
      <div>
        {
          loanDetails&&<RepaymentSchedule onUpdate={onUpdate} loanDetails={loanDetails}/>
        }
      
      </div>
      <div>
      <h1>Range Slider Example</h1>
      <RangeSlider min={50000} max={10000000} step={5000} initialValue={50000} />
    </div>
    </>
  );
};
export default EMIForm;
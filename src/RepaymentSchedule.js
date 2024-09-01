import React, { useState, useEffect } from "react";
import { getRepaymentSchedule, getRepaymentScheduleWithExtraEMI } from "./calculator";
import './App.css';

const RepaymentSchedule = ({ loanDetails, onUpdate }) => {
  const [schedule, setSchedule] = useState([]);
  const [extraEmiValues, setExtraEmiValues] = useState({});
  //const totalInterest=0;
  // console.log({ loanDetails, extraEmiValues });

  useEffect(() => {
    const fetchRepaymentSchedule = async () => {
      if (loanDetails) {
        try {
          const loanScheduleRequest = {
            loanAmount: loanDetails.loanAmount,
            interestRate: loanDetails.interestRate,
            tenure: loanDetails.tenure,
            emi: loanDetails.emi,
          };
          const response = getRepaymentSchedule(loanScheduleRequest);
        //  console.log("schedule",response);
          if (response) {
            setSchedule(response);
          } else {
            setSchedule([]); // Default to empty array if no data is returned
          }
        } catch (error) {
          console.error("Error fetching repayment schedule:", error);
          setSchedule([]); // Default to empty array in case of error
        }
      }
    };

    fetchRepaymentSchedule();
  }, [loanDetails]);

  const handleExtraEmiChange = (month, value) => {
    setExtraEmiValues((prev) => ({
      ...prev,
      [month]: value,
    }));
  };

  const handleSave = async () => {
    const emiList = new Array(loanDetails.tenure).fill(0).map((_, index) => extraEmiValues[index] || 0);
    const loanEMIRequest = {
      loanAmount: loanDetails.loanAmount,
      interestRate: loanDetails.interestRate,
      tenure: loanDetails.tenure,
      emi: loanDetails.emi,
      emiList: emiList,
    };
    try {
      const response = getRepaymentScheduleWithExtraEMI(loanEMIRequest);
      if (response ) {
        console.log("Save response:", response);
        alert("Extra EMI values saved successfully!");
        setSchedule(response);
      }
    } catch (error) {
      console.error("Error saving extra EMI values:", error);
    }
  };

  return (
    <div className="schedule-container">
      <h2>Repayment Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Installment Date</th>
            <th>Loan Amount (₹)</th>
            <th>Interest Amount (₹)</th>
            <th>Principal Amount (₹)</th>
            <th>Installment (₹)</th>
            <th>Extra EMI (₹)</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(schedule) && schedule.length > 0 ? (
            schedule.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.installmentDate).toLocaleDateString()}</td>
                <td>{item.loanAmount.toFixed(2)}</td>
                <td>{item.interestAmount.toFixed(2)}</td>
                <td>{item.principalAmount}</td>
                <td>{item.installment.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Extra EMI"
                    value={extraEmiValues[index] || ''}
                    onChange={(e) => handleExtraEmiChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No schedule available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleSave} className="save-btn">Save Extra EMI Values</button>
    </div>
  );
};

export default RepaymentSchedule;

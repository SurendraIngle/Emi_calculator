import React, { useState } from "react";
import Tabs from "./Tabs"; // Adjust the import path as needed
import { PersonalEMIForm, HomeEMIForm, CarEMIForm } from "./EMIForms1"; // Adjust the import path as needed
import "./App.css";

const EMIFormContainer = () => {
  const [selectedForm, setSelectedForm] = useState("personal");
  const [loanDetails, setLoanDetails] = useState(null);

    const handleLoanDetailsUpdate = (updatedSchedule) => {
      setLoanDetails(prevDetails => ({
        ...prevDetails,
        schedule: updatedSchedule
      }));}
  const handleTabChange = (label) => {
    setSelectedForm(label);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personal":
        return <PersonalEMIForm onCalculateEmi={setLoanDetails} 
        loanDetails={loanDetails} 
        onUpdate={handleLoanDetailsUpdate}/>;
      case "home":
        return <HomeEMIForm onCalculateEmi={setLoanDetails} 
        loanDetails={loanDetails} 
        onUpdate={handleLoanDetailsUpdate}/>;
      case "car":
        return <CarEMIForm onCalculateEmi={setLoanDetails} 
        loanDetails={loanDetails} 
        onUpdate={handleLoanDetailsUpdate}/>;
      default:
        return <div>Select a form</div>;
    }
  };

  return (
    <div>
      <div className="tabs">
      <Tabs
        labels={["personal", "home", "car"]}
        onTabChange={handleTabChange}
      />
      </div>
      <div style={{ marginTop: "20px" }}>{renderSelectedForm()}</div>
    </div>
  );
};

export default EMIFormContainer;

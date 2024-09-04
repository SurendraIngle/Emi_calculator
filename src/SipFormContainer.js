import React, { useState } from "react";
import Tabs from "./Tabs"; // Adjust the import path as needed
import { MonthlySIPForm, QuarterlySIPForm, OneTimeSIPForm,YearlySIPForm,MonthlyGoalSIPForm,QuarterlyGoalSIPForm } from "./SipForms"; // Adjust the import path as needed
import "./App.css";

const SipFormContainer = () => {
  const [selectedForm, setSelectedForm] = useState("Month");


  const handleTabChange = (label) => {
    setSelectedForm(label);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "Month":
        return <MonthlySIPForm />;
      case "Quater":
        return <QuarterlySIPForm />;
      case "OneTime":
        return <OneTimeSIPForm />;
      case "Year":
           return <YearlySIPForm/>;
      case "Goal Month":
          return <MonthlyGoalSIPForm/>;
      case "Goal Quater":
           return <QuarterlyGoalSIPForm/>    
      default:
        return <div>Select a form</div>;
    }
  };

  return (
    <div>
      <div className="tabs">
        <Tabs
          labels={["Month", "Quater", "OneTime", "Year", "Goal Month","Goal Quater"]}
          onTabChange={handleTabChange}
        />
      </div>
      <div style={{ marginTop: "20px" }}>{renderSelectedForm()}</div>
    </div>
  );
};

export default SipFormContainer;

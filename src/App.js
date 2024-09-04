import React, { useState } from "react";
import Tabs from "./Tabs";
import EMIFormContainer from "./EMIFormContainer";
import SipFormContainer from "./SipFormContainer"; // Adjust the import path as needed
import "./App.css";

function App() {
  const [selectedForm, setSelectedForm] = useState("loan");

  const handleTabChange = (label) => {
    setSelectedForm(label);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "loan":
        return <EMIFormContainer />;
      case "sip":
        return <SipFormContainer />;
      default:
        return <div>select a form</div>;
    }
  };
  return (
    <div className="App">
      <h1>EMI Calculator</h1>
      <div className="tabs">
        <Tabs labels={["loan", "sip"]} onTabChange={handleTabChange} />
      </div>
      <div style={{ marginTop: "20px" }}>{renderSelectedForm()}</div>
    </div>
  );
}

export default App;

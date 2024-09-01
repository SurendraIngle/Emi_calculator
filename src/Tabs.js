import React, { useState } from "react";

const Tabs = ({ labels, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(labels[0]);

  const handleTabClick = (label) => {
    setActiveTab(label);
    onTabChange(label);
  };

  return (
    <div style={{ display: "flex" }}>
      {labels.map((label) => (
        <div
          key={label}
          style={{
            marginLeft: "20px",
            cursor: "pointer",
            fontWeight: activeTab === label ? "bold" : "normal",
          }}
          onClick={() => handleTabClick(label)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;

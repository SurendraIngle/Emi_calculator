import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoubleDoughnutChart = ({outerData,innerData}) => {
  
  const outerOptions = {
    cutout: "80%", // Inner doughnut's cutout size
    radius: "100%",
  };

  const innerOptions = {
    cutout: "60%", // Outer doughnut's cutout size, creating space between charts
    radius: "70%",
  };

  return (
    <div
      style={{
        position: "relative",
        height: "350px",
        margin: "auto",
        width: "50%",
      }}
    >
      {innerData && (<div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          marginBottom: "20px",
        }}
      >
        <Doughnut data={innerData} options={innerOptions} />
      </div>
       )}
      {outerData && (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Doughnut data={outerData} options={outerOptions} />
      </div>
      )}
    </div>
  );
};

export default DoubleDoughnutChart;

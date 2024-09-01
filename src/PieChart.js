import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoubleDoughnutChart = ({outerData,innerData}) => {
  // const outerData = {
  //   //  labels: ["A", "B", "C", "D"],
  //   datasets: [
  //     {
  //       data: [25, 25, 25, 25],
  //       backgroundColor: ["#6a0dad", "#1e90ff", "#20b2aa", "#ff6347"],
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  // const innerData = {
  //   datasets: [
  //     {
  //       data: [15, 15, 15, 15, 15, 15],
  //       backgroundColor: [
  //         "#ff00ff",
  //         "#1e90ff",
  //         "#20b2aa",
  //         "#6a0dad",
  //         "#ff6347",
  //         "#00bfff",
  //       ],
  //       borderWidth: 2,
  //     },
  //   ],
  // };

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
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          marginBottom: "20px",
        }}
      >
        <Doughnut data={innerData} options={innerOptions} />
      </div>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Doughnut data={outerData} options={outerOptions} />
      </div>
    </div>
  );
};

export default DoubleDoughnutChart;

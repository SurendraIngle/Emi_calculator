// import React, { useState} from "react";
// import './App.css'; // Import your CSS file
// import EMIForm  from "./EMICalculator";

// const App = () => {
//   const [loanDetails, setLoanDetails] = useState(null);

//   const handleLoanDetailsUpdate = (updatedSchedule) => {
//     setLoanDetails(prevDetails => ({
//       ...prevDetails,
//       schedule: updatedSchedule
//     }));
//   };

//   return (
//     <div style={{textAlign:'center'}}>
//       <h1>EMI Calculator</h1>
//       <EMIForm 
//         onCalculateEmi={setLoanDetails} 
//         loanDetails={loanDetails} 
//         onUpdate={handleLoanDetailsUpdate}
//       />
//     </div>
//   );
// };

// export default App;
import React from "react";
import EMIFormContainer from "./EMIFormContainer"; // Adjust the import path as needed
import "./App.css"

function App() {
  return (
    <div className="App" >
      <h1>EMI Calculator</h1>
      <EMIFormContainer />
    </div>
  );
}

export default App;

function calculateSIPMaturity(sipDetail) {
  // Convert annual interest rate to monthly interest rate
  let response = {};
  const interest = sipDetail.interestRate / 12 / 100;
  const numberOfMonths=sipDetail.tenure*12;

  // Calculate (1 + i)^n
  const compoundFactor = Math.pow(1 + interest, numberOfMonths);

  // Calculate maturity amount M
  const totalAmount = Math.ceil(sipDetail.sipAmount * ((compoundFactor - 1) / interest) * (1 + interest));
 response.totalAmount=totalAmount;

response.totalInvestment=sipDetail.sipAmount*numberOfMonths;
 response.estReturn=totalAmount-response.totalInvestment;
  return response; // Return the result rounded to two decimal places
}
 export function calculateSIPWithTopUp(sipDetail) {
  let response={};
  const monthlyInterestRate = sipDetail.interestRate / (12 * 100); // Convert annual interest rate to monthly
  const totalMonths = sipDetail.tenure * 12;
  // Step 1: Calculate FV of regular monthly SIP
  const futureValueSIP =sipDetail.sipAmount *((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) /monthlyInterestRate) *(1 + monthlyInterestRate);
  // Step 2: Calculate FV of yearly top-up amounts
  let futureValueTopUp = 0;
  for (let i = 1; i <= sipDetail.tenure; i++) {
    futureValueTopUp +=sipDetail.topUpAmount * Math.pow(1 + sipDetail.interestRate / 100, sipDetail.tenure - i);
  }
  // Step 3: Combine the future values
  const totalFutureValue = futureValueSIP + futureValueTopUp;
  const totalInvested = sipDetail.sipAmount * totalMonths + sipDetail.topUpAmount * sipDetail.tenure;
  // Step 4: Calculate total amount and estimated return
  const estimatedReturn = totalFutureValue - totalInvested;// Returning the result rounded to 2 decimal places
  response.totalAmount=totalFutureValue;
  response.estReturn=estimatedReturn;
  response.totalInvestment=totalInvested;
  return response
}
function calculateLumpSumFutureValue(sipDetail) {
  // Convert annual interest rate to periodic interest rate
  let response={};
  const r = sipDetail.interestRate / 12 / 100;
  const n = sipDetail.tenure * 12;
  const totalAmount =Math.ceil( sipDetail.sipAmount * Math.pow(1 + r, n));
response.totalAmount = totalAmount;
response.totalInvestment = sipDetail.sipAmount * n;
response.estReturn = totalAmount - response.totalInvestment;
return response; // Return the result rounded to two decimal places
}
function calculateYearlySIPFutureValue(sipDetail) {
  // Convert annual interest rate to decimal
  let response={};
  const i = sipDetail.interestRate / 100;
  const years = sipDetail.tenure;
  const totalAmount = Math.ceil(sipDetail.sipAmount * ((Math.pow(1 + i, years) - 1) / i) * (1 + i));
response.totalAmount = totalAmount;
  response.totalInvestment = sipDetail.sipAmount * years;
 response.estReturn = totalAmount - response.totalInvestment;
 return response; // Return the result rounded to two decimal places
}
// function calculateGoalSIPAmount(FV, annualInterestRate, years) {
//   // Convert annual interest rate to periodic interest rate
//   const i = annualInterestRate / 100;

//   // Total number of compounding periods
//   const n = years;

//   // Calculate SIP installment amount
//   const P = (FV * i) / (Math.pow(1 + i, n) - 1) / (1 + i);

//   return P.toFixed(2); // Return the result rounded to two decimal places
// }
function calculateQuarterlySIPAmount(sipDetail) {
  let response={};
  const i = sipDetail.interestRate / 4 / 100; // Quarterly interest rate
  const n = sipDetail.tenure * 4; // Total number of quarters
  const totalAmount = Math.ceil((sipDetail.sipAmount * i) / (Math.pow(1 + i, n) - 1));
response.totalAmount = totalAmount;
response.totalInvestment = sipDetail.sipAmount * n;
response.estReturn = totalAmount - response.totalInvestment;
return response;
}
function calculateGoalSIPAmount(FV, annualInterestRate, years, frequency) {
  let i, n;

  // Adjust interest rate and number of periods based on frequency
  if (frequency === "monthly") {
    i = annualInterestRate / 12 / 100; // Monthly interest rate
    n = years * 12; // Total number of months
  } else if (frequency === "quarterly") {
    i = annualInterestRate / 4 / 100; // Quarterly interest rate
    n = years * 4; // Total number of quarters
  } else {
    throw new Error('Frequency must be "monthly" or "quarterly".');
  }

  const P = (FV * i) / (Math.pow(1 + i, n) - 1);
  return P.toFixed(2);
}
export function calculateSIP(sipDetail,sipType){
  switch (sipType) {
    case "MONTHLY":
      return calculateSIPMaturity(sipDetail);
    case "QUATERLY":
      return calculateQuarterlySIPAmount(sipDetail);
    case "ONETIME":
      return calculateLumpSumFutureValue(sipDetail);
    case "YEARLY":
      return calculateYearlySIPFutureValue(sipDetail);
    case "GOAL":
        return calculateGoalSIPAmount(sipDetail,"monthly");
      
    default:
      return <div>Select a form</div>;
  }
}
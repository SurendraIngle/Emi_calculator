function calculateSIPMaturity(P, annualInterestRate, numberOfMonths) {
  // Convert annual interest rate to monthly interest rate
  const i = annualInterestRate / 12 / 100;

  // Calculate (1 + i)^n
  const compoundFactor = Math.pow(1 + i, numberOfMonths);

  // Calculate maturity amount M
  const M = P * ((compoundFactor - 1) / i) * (1 + i);

  return M.toFixed(2); // Return the result rounded to two decimal places
}

function calculateLumpSumFutureValue(P, annualInterestRate, years) {
  // Convert annual interest rate to periodic interest rate
  const r = annualInterestRate / 12 / 100;

  // Total number of compounding periods
  const n = years * 12;

  // Calculate future value
  const FV = P * Math.pow(1 + r, n);

  return FV.toFixed(2); // Return the result rounded to two decimal places
}
function calculateYearlySIPFutureValue(P, annualInterestRate, years) {
  // Convert annual interest rate to decimal
  const i = annualInterestRate / 100;

  // Total number of yearly installments
  const n = years;

  // Calculate future value
  const FV = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

  return FV.toFixed(2); // Return the result rounded to two decimal places
}
function calculateGoalSIPAmount(FV, annualInterestRate, years) {
  // Convert annual interest rate to periodic interest rate
  const i = annualInterestRate / 100;

  // Total number of compounding periods
  const n = years;

  // Calculate SIP installment amount
  const P = (FV * i) / (Math.pow(1 + i, n) - 1) / (1 + i);

  return P.toFixed(2); // Return the result rounded to two decimal places
}
function calculateQuarterlySIPAmount(FV, annualInterestRate, years) {
  const i = annualInterestRate / 4 / 100; // Quarterly interest rate
  const n = years * 4; // Total number of quarters
  const P = (FV * i) / (Math.pow(1 + i, n) - 1);
  return P.toFixed(2);
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
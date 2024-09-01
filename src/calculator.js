export function calculateEmi(loanDetail){
    let response={};
    let monthlyInterest=loanDetail.interestRate / 1200;
    let tenure=loanDetail.tenure*12;
    let powMonthTenure = Math.pow(1 + monthlyInterest, tenure);
    response.emi = Math.ceil(loanDetail.loanAmount * monthlyInterest * powMonthTenure / (powMonthTenure - 1));
   // console.log("Calculate EMI Response ", response);
    return response;

}

export function getRepaymentSchedule(loanScheduleRequest) {
    let dataList = [];
    let principalAmount = loanScheduleRequest.loanAmount;
    let date = new Date();
    date.setDate(1); // First day of next month
    date.setMonth(date.getMonth() + 1);
    date.setDate(5);

    for (let month = 0; month < loanScheduleRequest.tenure*12; month++) {
        let loanMonthData = {};
        date.setMonth(date.getMonth() + 1);
        let interest = Math.ceil(principalAmount * (loanScheduleRequest.interestRate / 1200));
        principalAmount = principalAmount - (Math.ceil(loanScheduleRequest.emi) - interest);
        
        loanMonthData.loanAmount = principalAmount;
        loanMonthData.installment = loanScheduleRequest.emi;
        loanMonthData.interestAmount = interest;
        loanMonthData.principalAmount = Math.ceil(loanScheduleRequest.emi) - interest;
        loanMonthData.installmentDate = new Date(date);
        
        dataList.push(loanMonthData);
    }
    return dataList;
}

 let newInterest=0;
export function getRepaymentScheduleWithExtraEMI(loanEMIRequest) {
    let totalInterestNew=0;
    let dataList = [];
    let principalAmount = loanEMIRequest.loanAmount;
    let date = new Date();
    date.setDate(1); // First day of next month
    date.setMonth(date.getMonth() + 1);
    date.setDate(5);
    let extraEmi = loanEMIRequest.emiList;

    for (let month = 0; month < loanEMIRequest.tenure*12 && principalAmount > 0; month++) {
        let loanMonthData = {};
        date.setMonth(date.getMonth() + 1);
        let interest = Math.ceil(principalAmount * (loanEMIRequest.interestRate / 1200));
        principalAmount = principalAmount - (Math.ceil(loanEMIRequest.emi) - interest);
        totalInterestNew=(totalInterestNew+interest);
        loanMonthData.loanAmount = principalAmount;
        loanMonthData.installment = loanEMIRequest.emi;
        loanMonthData.interestAmount = interest;
        loanMonthData.principalAmount = (loanEMIRequest.emi - interest) + parseInt(extraEmi[month]);
        loanMonthData.extraEMI = extraEmi[month];
        loanMonthData.installmentDate = new Date(date);
        
        principalAmount = principalAmount - extraEmi[month];
        dataList.push(loanMonthData);
    }
    newInterest=totalInterestNew;
    return dataList;
}
export function getNewLoanDetails(loanAmount){
const newLoanDetail={
    newInterest:newInterest,
    newTotalAmountTopay:(loanAmount+newInterest),
};
return newLoanDetail;
}
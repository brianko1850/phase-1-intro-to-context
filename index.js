// Your code here
function createEmployeeRecord(array) {
    
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrays) {
    const employeeRecords = []
    for(let item of arrays){
        employeeRecords.push(createEmployeeRecord(item))
    }
    return employeeRecords
    
}
    
function createTimeInEvent(record, timeInString) {
    const timeInArray = timeInString.split(" ")
    const obj = {
        type: "TimeIn",
        hour: Number(timeInArray[1]),
        date: `${timeInArray[0]}`
    }
    record.timeInEvents.push(obj)
    
    return record
    

}

function createTimeOutEvent(record, timeInString) {
    const timeInArray = timeInString.split(" ")
    const obj = {
        type: "TimeOut",
        hour: Number(timeInArray[1]),
        date: `${timeInArray[0]}`
    }
    record.timeOutEvents.push(obj)
    return record

}



function hoursWorkedOnDate(record, dateInString) {
let timeIn = record.timeInEvents.find(item => {
    return item.date === dateInString
})
let timeOut = record.timeOutEvents.find(item => {
    return item.date === dateInString
})

return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, dateInString) {
    console.log(record, dateInString)
   let hoursWorked = hoursWorkedOnDate(record, dateInString)
   let hourlyWage = record.payPerHour
   let wageEarned = hoursWorked * hourlyWage
   
   return wageEarned
}

function allWagesFor(record) {
    let eligibleDates = record.timeInEvents.map(item => item.date)
    //console.log(eligibleDates)
   let totalWage = eligibleDates.reduce((acc, date) => {
   
       return acc + wagesEarnedOnDate(record, date)
       
   }, 0)
   return totalWage
}

function calculatePayroll(array) {
 let payroll = array.reduce((acc, employee) => {
     console.log (employee)
     return acc + allWagesFor(employee)
 }, 0)
 console.log(payroll)
   return payroll
   
}
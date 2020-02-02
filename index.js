/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],  
        familyName:employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(eeArr) {
    return eeArr.map(ee => createEmployeeRecord(ee))
}

function createTimeInEvent(timeInStamp) {
    const [date, time]= timeInStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    })
    return this
}

function createTimeOutEvent(timeOutStamp) {
    const [date, time]= timeOutStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    })
    return this
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find(dayWorked => dayWorked.date === date)
    let timeOut = this.timeOutEvents.find(dayWorked => dayWorked.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}


function calculatePayroll(arrayOfEeRecords){
    let sum = arrayOfEeRecords.reduce((total, employee) => total + allWagesFor.call(employee), 0)
    return sum
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(name => {return name.firstName === firstName})
} 

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
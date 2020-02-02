function createEmployeeRecord(recordArray){
    return {
        firstName: recordArray[0],
        familyName: recordArray[1], 
        title: recordArray[2], 
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecords){
    return employeeRecords.map(function(record){
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
        this.timeInEvents.push({
         type: "TimeIn",
         hour: parseInt(hour),
         date: date
     })
     return this
 };

 function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')
        this.timeOutEvents.push({
         type: "TimeOut",
         hour: parseInt(hour),
         date: date
     })
     return this
 };

 function hoursWorkedOnDate(date){
     let inEvent = this.timeInEvents.find(function(timeRecord){
        return timeRecord.date === date
     })

     let outEvent = this.timeOutEvents.find(function(timeRecord){
        return timeRecord.date === date
     })
    return (outEvent.hour-inEvent.hour)/100
 };

//  function wagesEarnedOnDate(date){
//     let wage = employeeRecord.payPerHour
//     let pay = hoursWorkedOnDate(employeeRecord, date) * wage
//     return pay
//  }

 function findEmployeeByFirstName(employeeRecords, firstName){
    let employee = employeeRecords.find(function(record){
        return record.firstName === firstName
    })
    return employee
}

// function calculatePayroll(employeeRecords){
//    return employeeRecords.reduce(function(memo, employee){
//        return memo + allWagesFor(employee)
//    } ,0)
// }
 
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


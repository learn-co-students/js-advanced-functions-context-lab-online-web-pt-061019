function createEmployeeRecord(recordArray){
    return {
        firstName: recordArray[0],
        familyName: recordArray[1], 
        title: recordArray[2], 
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(employeeRecords){
    return employeeRecords.map(function(record){
        return createEmployeeRecord(record)
    })
};

function createTimeInEvent(dateStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this
};

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this
};

function hoursWorkedOnDate(date){
    let outEvent = this.timeOutEvents.find(timeOut => timeOut.date === date);
    let inEvent = this.timeInEvents.find(timeIn => timeIn.date === date);
    return (outEvent.hour - inEvent.hour) / 100
};

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

function findEmployeeByFirstName(array, name){
    return array.find(record => record.firstName === name);
};

function calculatePayroll(array){
    let totalWages = array.map(rec => allWagesFor.call(rec));
    return totalWages.reduce((memo, w) => memo + w);
};

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
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

  let employeeRecords = createEmployeeRecords(csvDataEmployees)
            employeeRecords.forEach(function (rec) {
              let timesInRecordRow = csvTimesIn.find(function (row) {
                return rec.firstName === row[0]
              })

              let timesOutRecordRow = csvTimesOut.find(function (row) {
                return rec.firstName === row[0]
              })

              timesInRecordRow[1].forEach(function(timeInStamp){
                createTimeInEvent.call(rec, timeInStamp)
              })

              timesOutRecordRow[1].forEach(function(timeOutStamp){
                createTimeOutEvent.call(rec, timeOutStamp)
              })
            }) 

            calculatePayroll(employeeRecords)



/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(array) {
    return array.map(arr => createEmployeeRecord(arr));
};

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    });
    return this;
};

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    });
    return this;
};

function hoursWorkedOnDate(date) {
    let outEvent = this.timeOutEvents.find(e => e.date === date);
    let inEvent = this.timeInEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) * .01
};

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

function allWagesFor() {
    let eligibleDates = this.timeInEvents.map(e => e.date);
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0);
    return payable;
};

function calculatePayroll(array) {
    let totalWages = array.map(rec => allWagesFor.call(rec));
    return totalWages.reduce((memo, w) => memo + w);
};

function findEmployeeByFirstName(array, name) {
    return array.find(rec => rec.firstName === name);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }
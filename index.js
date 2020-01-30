/* Your Code Here */

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

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays){
   return arrayOfArrays.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(time) {
    let [date, hour] = time.split(' ')

    this.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date: date})
    return this
}

function createTimeOutEvent(time) {
    let [date, hour] = time.split(' ')

    this.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date: date})
    return this
}

function hoursWorkedOnDate(time) {
    let timeIn = this.timeInEvents.find(x => x.date === time)
    let timeOut = this.timeOutEvents.find(x => x.date === time)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date) {
   return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function calculatePayroll(arrayOfRecords) {
    let sum = arrayOfRecords.map(e => allWagesFor.call(e))
    return sum.reduce((num, sum) => num + sum)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => {return e.firstName === firstName})
}
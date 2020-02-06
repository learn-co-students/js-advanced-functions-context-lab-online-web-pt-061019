/* Your Code Here */

let createEmployeeRecord = function(array) {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }

  return employee
}

let createEmployeeRecords = function(arrayOfEmployees) {

  let newArray = arrayOfEmployees.map(function(e){
      return createEmployeeRecord(e)
  })

  return newArray

}

let createTimeInEvent = function(dateStamp) {
  // A date stamp ("YYYY-MM-DD HHMM")
  let time = dateStamp.split(" ")
  let hour = parseInt(time[1].slice(0,5))
  let date = time[0] // How should this be formatted?

  let newObject = {
    type: "TimeIn",
    hour: hour,
    date: date
  }

  this.timeInEvents.push(newObject)

  return this
}

let createTimeOutEvent = function(dateStamp) {
  // A date stamp ("YYYY-MM-DD HHMM")
  let time = dateStamp.split(" ")
  let hour = parseInt(time[1].slice(0,5))
  let date = time[0] // How should this be formatted?

  let newObject = {
    type: "TimeOut",
    hour: hour,
    date: date
  }

  this.timeOutEvents.push(newObject)

  return this
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}


let wagesEarnedOnDate = function(date) {

  let amountOwed = hoursWorkedOnDate.call(this, date) * this.payPerHour

  return amountOwed

}

let calculatePayroll = function(arrayOfEmployees) {
  // let newArray = arrayOfEmployees.map(function(e){
  //     return allWagesFor(e)
  // })
  //
  // newArray.reduce(function(memo, employee) {
  //   return memo + allWagesFor(employee)
  // }, 0)

  return arrayOfEmployees.reduce(function(memo, employee) {
    return memo + allWagesFor.call(employee)
  }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(employee) { return employee.firstName === firstName})
}

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

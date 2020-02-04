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

function calculatePayroll(arr) {
  return arr.reduce(function(memo, i) {
    return memo + allWagesFor.call(i)
  }, 0)
}



function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  let records = arr.map(createEmployeeRecord);
  return records;
}

function hoursFromStamp(dateStamp) {
  let arr = dateStamp.split(" ");
  let time = parseFloat(arr[1], 10);
  return time;
};

function dateFromStamp(dateStamp) {
  let arr = dateStamp.split(" ");
  let date = arr[0];
  // let dateSplit = date.split("-");
  // let day = dateSplit[2]
  return date;
};

function createTimeInEvent(dateStamp) {
  this.timeInEvents.push(
    {
    type: "TimeIn",
    hour: hoursFromStamp(dateStamp),
    date: dateFromStamp(dateStamp)
  }
  )
  return this
}

function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: hoursFromStamp(dateStamp),
    date: dateFromStamp(dateStamp)
  })
  return this
}

function hoursWorkedOnDate(date) {
  let theTimeInEvent = this.timeInEvents.find(function(e) {
    return e.date === date;
  });
  let hourStarted = theTimeInEvent.hour / 100;
  let theTimeOutEvent = this.timeOutEvents.find(function(e) {
    return e.date === date;
  });
  let hourFinished = theTimeOutEvent.hour / 100;
  let hoursWorked = hourFinished - hourStarted;
  return hoursWorked;

}

function wagesEarnedOnDate(date) {
  let wage = this.payPerHour;
  let boundHoursWorkedOnDate = hoursWorkedOnDate.bind(this);
  let hours = boundHoursWorkedOnDate(date);
  let payOwed = hours * wage;
  return payOwed;
}


function findEmployeeByFirstName(srcArray, firstName) {
  const match = srcArray.find(function(e) {
    return e.firstName = firstName;
  });
  return match;
}



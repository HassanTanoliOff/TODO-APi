const { generateNewDueDate } = require("../utils/dateUtil");

exports.dateTimeValidator = (req, res, next) => {
  const date = req.body.dueDate;

  if (date == null || typeof date == "undefined") {
    req.body.dueDate = generateNewDueDate();
    return next();
  }
///// The incoming Date string is converted to Date Object here 
  const dateMaker = (date) => {
    const splitDate = date.split(/[-/]/);
    
    console.log("inside splitDate ", splitDate);
    const num = splitDate.map(Number)
    console.log(num)
    if(num.some(n => Number.isNaN(n))) return null;
    else{
      
      let [dateS, monthS, yearS] = num;
      console.log(`dateS:${dateS},monthS${monthS},yearS:${yearS}`);
      return new Date(Date.UTC(yearS, monthS - 1, dateS));
    }

  };
  const finalDate = dateMaker(date);
  console.log({ finalDate });
  if(!finalDate ) {
    return res.status(400).json({success:'failed',message :'incorrect Date',data:{finalDate}})
  }

  if (isNaN(finalDate)) {
    return res.status(400).json({
      success: "Failed",
      message:
        'Invalid Date format , allowed formats :"day/month/year : 01/01/2000"',
      date: date,
    });
  }

  const sliceDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dateToString = sliceDate(finalDate); //// converting due date to string for comparison
  const currentDate = sliceDate(new Date()); //// converting current date to string for comparison

  //// if the adjusted date is smaller that is the date is already passed throw error as the due date will never come
  if (finalDate) {
    //// comparison body
    //// if due date is is already passed or on the same day it will not work
    if (dateToString <= currentDate)
      return res.status(400).json({
        success: "Failed",
        message: "Due date must be a valid future date",
        Data: `Date given :${finalDate}`,
      });

    //// assign the adjusted date to request body
    req.body.dueDate = finalDate;
    next();
  }
};

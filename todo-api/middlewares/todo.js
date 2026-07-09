exports.DateTimeFormatterMiddleware = (req, res, next) => {
  if (req.method == "GET") return next();
  const body = req.body;
  //console.log("inside the date middleware body:",body)
  const date = body.dueDate;
  ////  if the date body is null Skip the validation and assign the default value
  if(date == null) return next() 
  //// date months starts at 0 so add 1 for proper month
  //// first convert string date into date object
  const dateObj = new Date(date);
  //// if the date is not a valid format throw error to enter valid date format
  if (isNaN(dateObj)) {
    return res.json({
      success: "Failed",
      message:
        'Invalid Date format , allowed formats :"Month/Day/Year and Year/Month/Day"',
      date: date,
    });
  }
  //// implement / adjust date here
  /// adding 1 to both day and month
  const dayN = dateObj.getDate() + 1;
  const monthN = dateObj.getMonth() + 1;
  const yearN = dateObj.getFullYear();
  const adjustedDate = `${monthN}-${dayN}-${yearN}`;
  //// again pass it throw  new date object to make a proper date
  const finalDate = new Date(adjustedDate);
  //// Convert Dates to string to compare for past dates
  const dateToString = finalDate.toISOString().slice(0, 10); //// converting due date to string for comparison
  const currentDate = new Date().toISOString().slice(0, 10); //// converting current date to string for comparison

  //// if the adjusted date is smaller that is the date is already passed throw error as the due date will never come
  if (!isNaN(finalDate) || finalDate != null) {
    //// comparison body
    //// if due date is is already passed or on the same day it will not work
    if (dateToString <= currentDate)
      return res.json({
        success: "Failed",
        message: "Due date must be a valid future date",
        Data: `Date given :${finalDate}`,
      });

    //// assign the adjusted date to request body
    req.body.dueDate = finalDate;
  }
  next();
};

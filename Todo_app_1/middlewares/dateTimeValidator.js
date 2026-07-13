const { generateNewDueDate } = require("../utils/dateUtil");

exports.dateTimeValidator = (req, res, next) => {
  const date = req.body.dueDate;

  if (date == null || typeof date == "undefined") {
    req.body.dueDate = generateNewDueDate();
    return next();
  }

  const dateMaker = (date) => {
    const splitDate = date.split(/[-/]/);

    const num = splitDate.map(Number);
    console.log(num);
    if (num.some((n) => Number.isNaN(n))) return null;
    else {
      let [dateS, monthS, yearS] = num;

      return new Date(Date.UTC(yearS, monthS - 1, dateS));
    }
  };
  const finalDate = dateMaker(date);
  console.log({ finalDate });
  if (!finalDate) {
    return res.status(400).json({
      success: "failed",
      message: "incorrect Date",
      data: { finalDate },
    });
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
  const dateToString = sliceDate(finalDate);
  const currentDate = sliceDate(new Date());

  if (finalDate) {
    if (dateToString <= currentDate)
      return res.status(400).json({
        success: "Failed",
        message: "Due date must be a valid future date",
        Data: `Date given :${finalDate}`,
      });

    req.body.dueDate = finalDate;
    next();
  }
};

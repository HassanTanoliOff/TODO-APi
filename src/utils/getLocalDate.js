exports.getLocalDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  const formatter = new intr.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formatter.format(now).replace(/\//g, "-");
};

exports.getValidDueDate = () => {
  const now = new Date();
  const formatter = new intr.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type) =>
    parseInt(parts.find((p) => p.type == type).value, 10);

  return new Date(
    getPart("year"),
    getPart("month") - 1,
    getPart("day"),
    getPart("hour"),
    getPart("minute"),
    getPart("second"),
  );
};

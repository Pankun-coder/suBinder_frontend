export const isDateValid = (year, month, day) => {
  if (Number.isNaN(parseInt(year)) || Number.isNaN(parseInt(month)) || Number.isNaN(parseInt(day)))
    return false;
  if (year < 2000 || year > 3000) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > new Date(year, month, 0).getDate()) return false;
  return true;
};

export const isTimeValid = (hour, min) => {
  if (Number.isNaN(parseInt(hour)) || Number.isNaN(parseInt(min))) return false;
  if (hour >= 0 && hour < 24 && min >= 0 && min < 60) {
    return true;
  } else {
    return false;
  }
};

export const areAllValidNumbers = (array) => {
  for (let index in array) {
    if (Number.isNaN(parseInt(array[index]))) return false;
  }
  return true;
};

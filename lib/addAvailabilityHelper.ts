export const isDateValid = (year: number, month: number, day: number): boolean => {
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return false;
  if (year < 2000 || year > 3000) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > new Date(year, month, 0).getDate()) return false;
  return true;
};

export const isTimeValid = (hour: number, min: number): boolean => {
  if (Number.isNaN(hour) || Number.isNaN(min)) return false;
  if (hour >= 0 && hour < 24 && min >= 0 && min < 60) {
    return true;
  } else {
    return false;
  }
};

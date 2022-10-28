export const getFirstDayOfMonth = (dateObj) => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
};

export const getLastDayOfMonth = (dateObj) => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
};

export const isDayReservedBy = (aPerson, daysAvailabilities) => {
  for (const i in daysAvailabilities) {
    if (daysAvailabilities[i].reservedBy.id === aPerson) {
      return true;
    }
  }
  return false;
};
export const isDayAvailable = (availabilities) => {
  for (const i in availabilities) {
    if (!availabilities[i].reservedBy.id) return true;
  }
  return false;
};

export const isTimeReservedBy = (aPerson, time, availabilities) => {
  for (let i in availabilities) {
    if (availabilities[i].reservedBy.id === aPerson) {
      if (
        JSON.stringify(availabilities[i].from) === JSON.stringify(time.from) &&
        JSON.stringify(availabilities[i].to) === JSON.stringify(time.to)
      ) {
        return true;
      }
    }
  }
  return false;
};
export const isTimeAvailable = (time, availabilities) => {
  for (const i in availabilities) {
    if (!availabilities[i].reservedBy.id) {
      if (
        JSON.stringify(availabilities[i].from) === JSON.stringify(time.from) &&
        JSON.stringify(availabilities[i].to) === JSON.stringify(time.to)
      ) {
        return true;
      }
    }
  }
  return false;
};

export const isReservedBy = (aPerson, availability) => {
  if (availability.reservedBy.id == aPerson) return true;
  return false;
};
export const isAvailable = (availability) => {
  if (!availability.reservedBy.id) return true;
  return false;
};

export const areObjectsIdentical = (obj1, obj2) => {
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
    return true;
  } else {
    return false;
  }
};

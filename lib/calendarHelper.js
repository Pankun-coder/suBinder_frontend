export const getFirstDayOfMonth = (dateObj) => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
};

export const getLastDayOfMonth = (dateObj) => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
};

export const hasReservationBy = (aPerson, arrayOfAvailabilities) => {
  for (const i in arrayOfAvailabilities) {
    if (arrayOfAvailabilities[i].reservedBy.id == aPerson) {
      return true;
    }
  }
  return false;
};

export const areAllReserved = (arrayOfAvailabilities) => {
  for (const i in arrayOfAvailabilities) {
    if (arrayOfAvailabilities[i].reservedBy.id == null) {
      return false;
    }
  }
  return true;
};

export const isReservedBy = (aPerson, availability) => {
  if (availability.reservedBy.id == aPerson) return true;
  return false;
};

export const isAvailable = (availability) => {
  if (!availability.reservedBy.id) return true;
  return false;
};

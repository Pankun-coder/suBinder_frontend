interface StudentInfo {
  id: number | null;
  name: string | null;
}

interface Availability {
  from: string;
  to: string;
  reservedBy: StudentInfo;
  id: number;
}

export const getFirstDayOfMonth = (dateObj: Date): Date => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
};

export const getLastDayOfMonth = (dateObj: Date): Date => {
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
};

export const hasReservationBy = (
  aPerson: number,
  arrayOfAvailabilities: Availability[],
): boolean => {
  for (const i in arrayOfAvailabilities) {
    if (arrayOfAvailabilities[i].reservedBy.id == aPerson) {
      return true;
    }
  }
  return false;
};

export const areAllReserved = (arrayOfAvailabilities: Availability[]): boolean => {
  for (const i in arrayOfAvailabilities) {
    if (arrayOfAvailabilities[i].reservedBy.id == null) {
      return false;
    }
  }
  return true;
};

export const isReservedBy = (aPerson: number, availability: Availability): boolean => {
  if (availability.reservedBy.id == aPerson) return true;
  return false;
};

export const isAvailable = (availability: Availability): boolean => {
  if (!availability.reservedBy.id) return true;
  return false;
};

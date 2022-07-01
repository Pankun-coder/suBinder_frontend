export const calendarDaysFor = (dateObj) => {  //Give date Object with the month you want a calendar for
    const result = [];
    const firstOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    const lastOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);

    const validDays = Array(lastOfMonth.getDate()).fill(0).map((value, index) => index + 1);
    const preBlanks = Array(firstOfMonth.getDay()).fill(0); //0 = sun, 1 = mon...　represents how many blanks are needed
    result = preBlanks.concat(validDays);
    if (result.length % 7 !== 0) {
        const postBlank = Array(7 - (result.length % 7)).fill(0)
        result.push(...postBlank);
    }
    return result
}

export const isDayReservedBy = (aPerson, daysAvailabilities) => {
    for (const i in daysAvailabilities) {
        if (daysAvailabilities[i].reservedBy.id === aPerson){
            return true
        }
    }
    return false
}
export const isDayAvailable = (availabilities) => {
    for (const i in availabilities) {
        if (!availabilities[i].reservedBy.id) return true;
    }
    return false
}

export const isTimeReservedBy = (aPerson, time, availabilities) => {
    for (let i in availabilities) {
        if (availabilities[i].reservedBy.id === aPerson){
            if (JSON.stringify(availabilities[i].from) === JSON.stringify(time.from) && JSON.stringify(availabilities[i].to) === JSON.stringify(time.to)){
                return true
            }
        }
    }
    return false
}
export const isTimeAvailable = (time, availabilities) => {
    for (const i in availabilities) {
        if (!availabilities[i].reservedBy.id){
            if (JSON.stringify(availabilities[i].from) === JSON.stringify(time.from) && JSON.stringify(availabilities[i].to) === JSON.stringify(time.to)){
                return true
            }
        }
    }
    return false
}

export const isReservedBy = (aPerson, availability) => {
    if (availability.reservedBy.id == aPerson) return true
    return false
}
export const isAvailable = (availability) => {
    if (!availability.reservedBy.id) return true
    return false
}
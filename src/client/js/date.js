// Create the end date by adding 24 hours
export function calculateEndDate(start){
    const startDate = new Date(start);
    return new Date(startDate.getTime() + oneDay());
}

// calculates a full day (this function only really exists to demonstrate testing)
export function oneDay() {  
    return 60 * 60 * 24 * 1000;
}

function parseDateTime(logEntry) {
    // Define regex components
    const yearRegex = '(?<year>[1-2]\\d{3})';
    const monthRegex = '(?<month>(0[1-9]|1[0-2]))';
    const dayRegex = '(?<day>(0[0-9]|[1-2][0-9]|3[0-1]))';
    const dateRegex = `${yearRegex}-${monthRegex}-${dayRegex}`;
    const timeRegex = '(?<time>([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])';
    const dateTimeRegex = `(?<date_time>${dateRegex}T${timeRegex})`;
    const logDataRegex = new RegExp(dateTimeRegex, 'gm');

    // Perform regex matching
    const match = logDataRegex.exec(logEntry);
    if (!match || !match.groups) {
        throw new Error("The date was not found in the log entry");
    }

    // Validate that all required keys exist
    const { year, month, day, time, date_time } = match.groups;
    if (!year || !month || !day || !time || !date_time) {
        throw new Error("The date is missing required fields");
    }

    // Validate the date-time structure
    if (!isValidDateTime(match.groups)) {
        throw new Error("The date is invalid");
    }

    // Safely cast and return
    return match.groups;
}

function isValidDateTime(matchGroups) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year = Number(matchGroups.year)
    const month = Number(matchGroups.month)
    const day = Number(matchGroups.day)

    // Handle leap year for February
    if (month === 2 && isLeapYear(year)) {
        daysInMonth[1] = 29; // February has 29 days in a leap year
    }

    // Validate the day against the maximum allowed days for the month
    return day <= daysInMonth[month - 1];
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

module.exports = parseDateTime

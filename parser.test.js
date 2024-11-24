const parseDateTime = require('./parser');

// Define valid test cases
const validTestCases = [
  ['[2024-01-01T00:00:00] - 192.168.1.10', '2024-01-01T00:00:00'],
  ['[2024-02-29T12:15:30] - 127.0.0.1', '2024-02-29T12:15:30'], // Leap year check
  ['[2024-03-15T18:45:20] - 10.0.0.1', '2024-03-15T18:45:20'],
  ['[2024-07-04T09:30:00] - 8.8.8.8', '2024-07-04T09:30:00'],
  ['[2024-12-31T23:59:59] - 192.168.0.1', '2024-12-31T23:59:59'],
];

// Define invalid test cases
const invalidTestCases = [
  '[2024-02-30T08:20:10] - 192.168.1.10', // February 30 does not exist
  '[2024-13-01T10:00:00] - 127.0.0.1',    // Invalid month
  '[2024-04-31T11:00:00] - 10.0.0.1',    // April has 30 days
  '[2024-11-07T25:00:00] - 8.8.8.8',     // Invalid hour
  '[2024-11-07T15:61:00] - 192.168.0.1', // Invalid minute
];

// Tests for valid dates
test.each(validTestCases)(
  'parses valid log entry "%s" to extract date time "%s"',
  (logEntry, expectedDateTime) => {
    const parsed = parseDateTime(logEntry);
    expect(parsed).not.toBeNull(); // Ensure a match is found
    expect(parsed['date_time']).toBe(expectedDateTime); // Validate the extracted date
  }
);

// Tests for invalid dates
test.each(invalidTestCases)(
  'rejects invalid log entry "%s"',
  (logEntry) => {
    expect(() => parseDateTime(logEntry)).toThrow();
  }
);

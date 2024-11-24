# Advanced Log File Parser with Regex

## Overview

This task is designed to test and demonstrate the regex skills by creating a JavaScript function that can parse detailed information from complex server log entries. It consts of a regular expression to capture specific data components from each log entry, which includes timestamps, IP addresses, request types, URL paths, HTTP status codes, and user agent strings.

## Task Requirements

Create a JavaScript function that takes a log entry as input and uses regex to extract the following components as individual groups:

1. **Timestamp**: Matches a format like `[YYYY-MM-DDTHH:MM:SS]`.
2. **IP Address**: Supports both IPv4 (e.g., `192.168.1.10`) and IPv6 (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).
3. **Request Type**: Captures HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.
4. **URL Path**: Matches the URL path, including any parameters that appear after `?`.
5. **HTTP Status Code**: Captures a 3-digit status code (e.g., `200`, `404`, `500`).
6. **User Agent**: Captures the full user agent string, even if it contains spaces and special characters.

The function should return an object with the extracted data fields.

## Example

For the following log entry:

```plaintext
[2024-11-07T15:30:45] - 192.168.1.10 - "GET /api/v1/resources?query=test HTTP/1.1" - 200 - "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
```

The function should return:

```javascript
{
    timestamp: "2024-11-07T15:30:45",
    ipAddress: "192.168.1.10",
    requestType: "GET",
    urlPath: "/api/v1/resources?query=test",
    statusCode: "200",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
```
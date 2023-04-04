--- 
slug: http-status-code
title: "Understanding HTTP Status Codes"

date: 2023-03-18

tags:

  - Server
  - Web

--- 


When working with HTTP to build a server, I can't ignore status codes. These code are used in RESTful APIs to indicate the status of a request. By understanding the meaning of each status code, clients can better handle server responses and take appropriate action.

### Here are the list of most commonly used HTTP status codes:

1xx (Informational): Request received and processing is continuing

- 100 (Continue)
- 101 (Switching Protocols)
- 102 (Processing)

2xx (Successful): The request was successfully received, understood, and accepted

- 200 (OK)
- 201 (Created)
- 202 (Accepted)
- 203 (Non-Authoritative Information)
- 204 (No Content)
- 205 (Reset Content)
- 206 (Partial Content)
- 207 (Multi-Status)
- 208 (Already Reported)
- 226 (IM Used)

3xx (Redirection): The client must take some additional action to complete the request

- 300 (Multiple Choices)
- 301 (Moved Permanently)
- 302 (Found)
- 303 (See Other)
- 304 (Not Modified)
- 305 (Use Proxy)
- 306 (Switch Proxy)
- 307 (Temporary Redirect)
- 308 (Permanent Redirect)

4xx (Client Error): The request contains bad syntax or cannot be fulfilled

- 400 (Bad Request)
- 401 (Unauthorized)
- 402 (Payment Required)
- 403 (Forbidden)
- 404 (Not Found)
- 405 (Method Not Allowed)
- 406 (Not Acceptable)
- 407 (Proxy Authentication Required)
- 408 (Request Timeout)
- 409 (Conflict)
- 410 (Gone)
- 411 (Length Required)
- 412 (Precondition Failed)
- 413 (Payload Too Large)
- 414 (URI Too Long)
- 415 (Unsupported Media Type)
- 416 (Range Not Satisfiable)
- 417 (Expectation Failed)
- 418 (I'm a teapot)
- 421 (Misdirected Request)
- 422 (Unprocessable Entity)
- 423 (Locked)
- 424 (Failed Dependency)
- 425 (Too Early)
- 426 (Upgrade Required)
- 428 (Precondition Required)
- 429 (Too Many Requests)
- 431 (Request Header Fields Too Large)
- 444 (Connection Closed Without Response)
- 451 (Unavailable For Legal Reasons)
- 499 (Client Closed Request)

5xx (Server Error): The server failed to fulfill an apparently valid request

- 500 (Internal Server Error)
- 501 (Not Implemented)
- 502 (Bad Gateway)
- 503 (Service Unavailable)
- 504 (Gateway Timeout)
- 505 (HTTP Version Not Supported)
- 506 (Variant Also Negotiates)
- 507 (Insufficient Storage)
- 508 (Loop Detected)
- 510 (Not Extended)
- 511 (Network Authentication Required)
- 599 (Network Connect Timeout Error)


### References:

(Mozilla Resources)[https://developer.mozilla.org/en-US/docs/Web/HTTP/Status]
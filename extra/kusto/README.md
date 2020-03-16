# Azure Data Explorer (Kusto) language

![adx](./adx.png)

## Overview

Kusto is a service for storing and running interactive analytics over Big Data.

Website: https://docs.microsoft.com/en-us/azure/kusto/query/

## Sample query

```
// Example from:
// https://docs.microsoft.com/en-us/azure/kusto/query/samples#get-sessions-from-start-and-stop-events
//
Events
| where Name == "Start"
| project Name, City, SessionId, StartTime=timestamp
| join (Events 
        | where Name="Stop"
        | project StopTime=timestamp, SessionId) 
    on SessionId
| project City, SessionId, StartTime, StopTime, Duration = StopTime - StartTime
```
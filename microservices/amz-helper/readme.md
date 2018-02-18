```
service: serverless-revieweer-amz-helper
stage: dev
region: us-east-1
stack: serverless-revieweer-amz-helper-dev
api keys:
  None
endpoints:
  GET - https://sv4tgjj3h9.execute-api.us-east-1.amazonaws.com/dev/itemLookUp?productId=xxx
functions:
  itemLookUp: serverless-revieweer-amz-helper-dev-itemLookUp
```
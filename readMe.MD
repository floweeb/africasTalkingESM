# Africa's Talking with Typescript
- Inspired by ease of use, Typescript with ESM using tsup for future back compatibility.
- Also anyone can tinker with the project with ease.

- Not much validation I leave that to you and handholding(on the technical side) but ask for
  directions, and definetely go throught the docs, never thought I'd say this 😂

*** STILL IN TESTING ***

*** NOT YET PUBLISHED, SO ASSUME THE IMPORT'S THAT FOLLOW AND GET BY GIT ***

## Features
### Currently implemented.
  1. Single SMS - `sms(message: string, phoneNumber: string)`
  2. Bulk SMS - `smsBulk(message: string, phoneNumber: string[])`

### Currently working on.
  1. SMS callback - WIP

### Thinking of implementing(original goal was SMSing, may expand if needed)
  1. ...


## Basic usage
### Installation
```
  npm i africastalkingesm
  // or
  pnpm add africastalkingesm
  // not sure if yarn will from the npm site to confirm
```
### Constructor
```
  import AfricasTalkingESM from "africastalkingesm";
  const africasTalking = new AfricasTalkingESM(username, apiKey);
```
### Send SMS - single
```
  // try/catch the error, mostly the user's error, but report if it's me
  try{
    const resp = await africasTalking.sms('hello world', '+254712345678');
    // console logging won't show deeper info! the full report should be somthing like:
    //  "Message": "Sent to 1/1 Total Cost: KES 0.8000 Message parts: 1",
    //  "Recipients": [
    //    {
    //      "cost": "KES 0.8000",
    //      "messageId": "ATXid_7cdb92fefb04afb863393d7842bddfa5",
    //      "number": "+254716925052",
    //      "status": "Success",
    //      "statusCode": 101
    //    }
    //  ]
      
    console.log('resp', resp);
  }catch(error){
    console.log('err', err);
    // handle error
  }

```

## Common pitfalls to be considered
### senderId
- `senderId` is required in production so if none is provided it will result to such an
  error:
  ```
        SMSMessageData: {
      "Message": "Sent to 0/1 Total Cost: 0",
      "Recipients": [
        {
          "cost": "0",
          "messageId": "None",
          "number": "+254716925052",
          "status": "UserInBlacklist",
          "statusCode": 406
        }
      ]
    }
  ```
  so in dev you can ignore `senderId` in class constructor: `constructor(username: string, apiKey: string, senderId? : string)`, but anything the `username` 'sandbox' is deemed
  a production ready app, so it will fail with the error:
  `Production apps require a 'senderId'`
  ps. you can add any string to `senderId` it doesn't matter in development it's dropped
  either way.

### Bulk sms in sandbox
  - this feature is still not implemented so I error out in sandbox mode with:
    `"This method smsBulk() isn't supported in sandbox mode yet!"`


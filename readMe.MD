# Africa's Talking with Typescript
- Inspired by ease of use, Typescript with ESM using tsup for future back compatibility.
- Also anyone can tinker with the project with ease.

- Not much validation I leave that to you and handholding(on the technical side) but ask for
  directions, and definetely go throught the docs, never thought I'd say this 😂

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
  // or this if in possesion of a senderId
  const africasTalking = new AfricasTalkingESM(username, apiKey, senderId);
```
### Send SMS
```
  // try/catch the error, mostly the user's error, but report if it's me
  try{
    const resp = await africasTalking.sms('hello world', '+254712345678');
    // or this for bulk
    const resp = await africasTalking.sms('hello world', ['+254712345678']);
    // console logging won't show deeper info! the full report should be somthing like:
    //  "Message": "Sent to 1/1 Total Cost: KES 0.8000 Message parts: 1",
    //  "Recipients": [
    //    {
    //      "cost": "KES 0.8000",
    //      "messageId": "ATXid_7cdb92fefb04afb863393d7842bddfa5",
    //      "number": "<some number>",
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
- `senderId` is not required in production, but with telcos like safaricom you will get the below
  error:
  ```
        SMSMessageData: {
      "Message": "Sent to 0/1 Total Cost: 0",
      "Recipients": [
        {
          "cost": "0",
          "messageId": "None",
          "number": "<some safaricom number>",
          "status": "UserInBlacklist",
          "statusCode": 406
        }
      ]
    }
  ```

### Bulk sms in sandbox
  - this feature is still not implemented so I error out in sandbox mode with:
    `"This method smsBulk() isn't supported in sandbox mode yet!"`


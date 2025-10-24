# Africa's Talking with Typescript
- Inspired by modern Typescript and ESM using tsup for future back compatibility.
- This is a bare bones project with little handholding but ask for direction,
  and definetely go throught the docs, never thought I'd say this 😂

*** STILL IN TESTING 
 NOT YET PUBLISHED, SO ASSUME THE IMPORT'S THAT FOLLOW AND GET BY GIT ***

## Basic usage
### Constructor

```
  import AfricasTalking from "cloned_repo_area";
  const africasTalking = new AfricasTalking(username, apiKey);
```
### Send SMS
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
  so in dev you can ignore `senderId` in class constructor: `constructor(username: string, apiKey: string, senderId? : string)`, but anything but the `username` 'sandbox' is deemed
  a production ready so the it will fail if not provided with the error:
  `throw new Error("Production apps require a 'senderId'");`
  ps. you can add any string to `senderId` it doesn't matter in development it's dropped
  either way.

### Bulk sms in sandbox
  - this feature is still not implemented so I error out in sandbox mode with:
    `"This method smsBulk() isn't supported in sandbox mode yet!"`


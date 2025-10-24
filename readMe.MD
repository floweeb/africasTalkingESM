## Africa's Talking with Typescript
- Inspired by modern Typescript and ESM using tsup for future back compatibility.

*** STILL IN TESTING ***
*** NOT YET PUBLISHED, SO ASSUME THE IMPORT'S THAT FOLLOW ***

# Basic usage
```
  import AfricasTalking from "cloned_repo_area";
  const af = new Af(username, apiKey);

  // it's an await method, with null as an error occured
  const resp = await af.sms('hello world', '+254745286227');
  if(!resp){
    // some error occured
  }
  // console logging won't show deeper info!
  console.log('resp', resp)
```


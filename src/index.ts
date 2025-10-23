//  IMPORTANT
// this project is based on my personal project so it won't ok,
// i'm just updating till I get how to this into a library using
// `psdown` 
// it's easier to just copy this snippet and use directly

// reason for this is because the current project has no typing
// so very unsuitable for typescript projects that are script

import axios, { AxiosInstance } from 'axios';

// base interface to build from here
interface AfricasTalking{
    username: string
    apiKey: string
    baseURL: string
    // for sending a single message
    // possiblly givea a tuple response with (ok, err)
    sms(message: string, phoneNumbers: string): Promise<SMSResponse | null>
}

// sms response json
interface SMSResponse{
    Message: string,
    Recipients: {
        statusCode: number,
        number: string,
        cost: string,
        status: string,
        messageId: string,
    }[]
}

// need to setup base credentials, incase of lib this is developer side
const username = process.env.AFRICAS_TALKING_USERNAME
if (!username){
    throw new Error(`the 'AFRICAS_TALKING_USERNAME' env isn't set!`);
}
const apiKey = process.env.AFRICAS_TALKING_API_KEY
if (!apiKey){
    throw new Error(`the 'AFRICAS_TALKING_API_KEY' env isn't set!`);
}

const africasTalking: AfricasTalking = {
    username,
    apiKey,
    baseURL: username === 'sandbox' ?
        'https://api.sandbox.africastalking.com/version1' :
        'https://api.africastalking.com/version1',
    async sms(message, phoneNumbers): Promise<SMSResponse | null>{
        const payload = {
            username,
            message,
            to: phoneNumbers
        }
        console.log('payload', payload)
        try{            
            const resp = await api.post<SMSResponse>('/messaging', payload);
            return resp.data
        }catch(err){
            console.log('sms error:\n', err);
            return null;
        }
    }
}

// base axios instance
const api: AxiosInstance = axios.create({
    baseURL: africasTalking.baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: africasTalking.apiKey
    }
});

export default africasTalking
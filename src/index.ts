import axios, { AxiosInstance } from 'axios';

// base interface to build from here
interface AfricasTalking{
    username: string
    apiKey: string
    baseURL: string
    // for sending a single message
    // possiblly givea a tuple response with (ok, err)
    sms(message: string, phoneNumbers: string): void
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
    async sms(message, phoneNumbers){
        const payload = {
            username,
            message,
            to: phoneNumbers
        }
        console.log('payload', payload)
        try{
            const resp = await api.post<SMSResponse>('/messaging', payload);
            console.log('resp.data: ', resp.data);
            return
        }catch(err){
            console.log('sms error:\n', err);
            return;
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
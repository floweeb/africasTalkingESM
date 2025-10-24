import type AfricasTalkingBlueprint from './interfaces.js';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { SMSResponse } from './interfaces.js';

class AfricasTalkingESM implements AfricasTalkingBlueprint {
    username: string
    apiKey: string
    baseURL: string
    api: AxiosInstance

    constructor(username: string, apiKey: string){
        // credentials for the API
        this.username = username;
        this.apiKey = apiKey;
        this.baseURL = username === 'sandbox' ?
            'https://api.sandbox.africastalking.com/version1' :
            'https://api.africastalking.com/version1'
        // base axios instance
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                apiKey: apiKey
            }
        });
    }
    
    async sms(message: string, phoneNumber: string): Promise<SMSResponse | null>{
        const payload = {
            username: this.username,
            message,
            to: phoneNumber
        }
        try{            
            const resp = await this.api.post<SMSResponse>('/messaging', payload);
            return resp.data
        }catch(err){
            console.log('sms error:\n', err);
            return null;
        }
    }
}

export default AfricasTalkingESM
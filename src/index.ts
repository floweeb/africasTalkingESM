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
                apiKey: apiKey,
                // content types are weird in Africa's talking so may vary endpoint to endpoint
                // this is just the default, may cause issues
                "Content-Type": "application/json",
            }
        });
    }
    
    async sms(message: string, phoneNumber: string): Promise<SMSResponse>{
        const payload = {
            username: this.username,
            message,
            to: phoneNumber
        }
        
        const resp = await this.api.post<SMSResponse>('/messaging',
            payload,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded"}
            }
        );
        return resp.data
    }

    async smsBulk(message: string, phoneNumber: string[]): Promise<SMSResponse>{
        if(this.username === 'sandbox'){
            throw new Error('Bulk isn\'t supported in sandbox mode yet!')
        }
        const payload = {
            username: this.username,
            message,
            phoneNumbers: phoneNumber
        }
        const resp = await this.api.post<SMSResponse>('/messaging/bulk', payload);
        return resp.data
    }
}

export default AfricasTalkingESM
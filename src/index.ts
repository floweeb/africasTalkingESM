import type AfricasTalkingBlueprint from './interfaces.js';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { SMSResponse } from './interfaces.js';

class AfricasTalkingESM implements AfricasTalkingBlueprint {
    productionApp: boolean

    username: string
    apiKey: string
    baseURL: string
    senderId: string | undefined

    // base axios instance extending the base blueprint up to you to implement yours
    api: AxiosInstance

    /**
     * Creates an object for using the africastalking api.
     * use username 'sandbox' if you want a developmental object otherwise it's
     * a production object where the 'senderId' is required.
     */
    constructor(username: string, apiKey: string, senderId?: string) {
        this.productionApp = username !== 'sandbox'
        // to ensure the senderId is set up before moving on.
        if (this.productionApp && !senderId) {
            throw new Error(`the 'AFRICAS_TALKING_SENDERID' env isn't set for production!`);
        }
        // credentials for the API
        this.username = username;
        this.apiKey = apiKey;
        this.baseURL = this.productionApp ?
            'https://api.africastalking.com/version1' :
            'https://api.sandbox.africastalking.com/version1'
        this.senderId = senderId
        
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

    /**
     * legacy bulk messaging
     * 
     */
    async smsLegacy(message: string, phoneNumber: string[]): Promise<SMSResponse> {
        const payload = {
            username: this.username,
            message,
            to: phoneNumber.join(','),
            from: this.senderId ? this.senderId : ''
        }
        
        const resp = await this.api.post<SMSResponse>('/messaging',
            payload,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        );
        return resp.data
    }

    /**
     * Modern bulk messaging, sandbox doesn't work yet.
     * 
     */
    async sms(message: string, phoneNumber: string[]): Promise<SMSResponse> {
        if (!this.productionApp) {
            throw new Error('This method smsBulk() isn\'t supported in sandbox mode yet!')
        }
        const payload = {
            username: this.username,
            message,
            phoneNumbers: phoneNumber,
            senderId: this.senderId ? this.senderId : ''
        }
        const resp = await this.api.post<SMSResponse>('/messaging/bulk', payload);
        return resp.data
    }
}

export default AfricasTalkingESM
// blueprint for the class main features and quick reference
interface AfricasTalkingBlueprint {
    // Credentials to use the API
    username: string
    apiKey: string
    baseURL: string
    // Methods to be used:
    // 1. for SMSing

    // for sending a single message*
    // possiblly givea a tuple response with (ok, err)
    // sms(message: string, phoneNumbers: string): Promise<SMSResponse | null>
}

export default class AfricasTalkingESM implements AfricasTalkingBlueprint {
    username: string
    apiKey: string
    baseURL: string
    constructor(username: string, apiKey: string){
        this.username = username;
        this.apiKey = apiKey;
        this.baseURL = username === 'sandbox' ?
            'https://api.sandbox.africastalking.com/version1' :
            'https://api.africastalking.com/version1'
    }
    
    display(){
        return 'hello world'
    }
}
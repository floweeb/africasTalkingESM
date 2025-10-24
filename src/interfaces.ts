// blueprint for the class main features and quick reference
export default interface AfricasTalkingBlueprint {
    productionApp: boolean      // check if in production setting
    // Credentials to use the API
    username: string
    apiKey: string
    baseURL: string

    // A base payload for requests
    payload: {
        username: string
        senderId?: string
    }
    // Methods to be used:
    // ==================
    // 1. for SMSing
    // -------------

    // response to be revised!
    // for sending a single message
    sms(message: string, phoneNumbers: string): Promise<SMSResponse | null>
    // for sending bulk messages doesn't work in sandbox
    smsBulk(message: string, phoneNumbers: string[]): Promise<SMSResponse | null>
}

// sms response json
export interface SMSResponse{
    Message: string,
    Recipients: {
        statusCode: number,
        number: string,
        cost: string,
        status: string,
        messageId: string,
    }[]
}
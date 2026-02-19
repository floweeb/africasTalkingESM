// blueprint for the class main features and quick reference
export default interface AfricasTalkingBlueprint {
    productionApp: boolean      // check if in production setting
    // Credentials to use the API
    username: string
    apiKey: string
    baseURL: string
    // For production use
    senderId: string | undefined

    // Methods to be used:
    // ==================
    // 1. for SMSing
    // -------------
    // responses to be revised!

    // legacy bulk messages
    smsLegacy(message: string, phoneNumbers: string[]): Promise<SMSResponse>
    // mordern bulk messages, doesn't work with sandbox yet
    sms(message: string, phoneNumbers: string[]): Promise<SMSResponse>
}

// raw response from africastalking
export interface AfricasTalkingResponse{
    SMSMessageData: SMSResponse
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
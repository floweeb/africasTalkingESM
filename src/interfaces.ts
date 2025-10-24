// blueprint for the class main features and quick reference
export default interface AfricasTalkingBlueprint {
    // Credentials to use the API
    username: string
    apiKey: string
    baseURL: string
    // Methods to be used:
    // ==================
    // 1. for SMSing
    // -------------

    // for sending a single message*
    // response to be revised!
    sms(message: string, phoneNumbers: string): Promise<SMSResponse | null>
}

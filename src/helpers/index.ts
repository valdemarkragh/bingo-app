import { v4 as uuidv4 } from "uuid";

export function generateGUID(): string {
    return uuidv4();
}

export function generateGameKey() {
    const length = 7;
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        result += randomNumber.toString();
    }

    return result;
}

export function handleWebsiteClose(event: any) {
    const confirmationMessage = "Are you sure you want to leave?";
    event.returnValue = confirmationMessage;
    return confirmationMessage;
}

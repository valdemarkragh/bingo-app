import { v4 as uuidv4 } from "uuid";

export function generateGUID(): string {
    return uuidv4();
}

export function handleWebsiteClose(event: any) {
    const confirmationMessage = "Are you sure you want to leave?";
    event.returnValue = confirmationMessage;
    return confirmationMessage;
}

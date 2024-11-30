import { sendMessage as sm } from "../../access-control/utils/useMethods";

export const sendMessage = (message, type) => {
    sm(message, type);
}
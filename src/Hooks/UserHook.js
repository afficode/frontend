import { getUserFromLocalStorage } from "../utils";

export const isLoggedIn = () => {
    const user = getUserFromLocalStorage();
    if (!user) {
        return false;
    }
    return true;
}
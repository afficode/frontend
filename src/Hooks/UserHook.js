import { getUserFromLocalStorage } from "../utils";

export const isLoggedIn = () => {
    const user = getUserFromLocalStorage();
    console.log(user);
    if (!user) {
        return false;
    }
    return true;
}
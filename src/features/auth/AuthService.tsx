import { STORAGE_KEY } from "../../shared/constants/appConstants"
import type { User } from "../../shared/types/User"
const AuthService = () => {

    const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS) || "[]") as User[];

    const login = (phone: string, password: string) => {
        const user = users.find(u => u.phone === phone && u.password === password);
        if (user) {
            localStorage.setItem(STORAGE_KEY.CURRENT_USER, JSON.stringify(user));
            return true;
        }
        return false;
    };
    return { login };
}

export default AuthService;
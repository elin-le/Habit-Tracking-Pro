import { MockUsers } from "../../data/users"
import { STORAGE_KEY } from "../constants/appConstants"

export const seedData = () => {
    const users = localStorage.getItem(STORAGE_KEY.USERS);
    if (!users) {
        localStorage.setItem(
            STORAGE_KEY.USERS,
            JSON.stringify(MockUsers)
        );

        console.log("Seeded users data");
    }
}
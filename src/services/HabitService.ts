import { habits } from "../data/habit";

const HabitService = {
    getAll() {
        return habits;
    },

    getById(id: string) {
        return habits.find(h => h.id === id);
    }
};

export default HabitService;
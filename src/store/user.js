import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            id: "",
            name: "",
            token: "",
        };
    },
    persist: true,
    getters: {
        getUser: (state) => state,
    },
});

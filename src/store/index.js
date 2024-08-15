import { useUserStore } from "@/store/user";

export const useStore = () => {
    return {
        user: useUserStore(),
    };
};

import http from "@/utils/http.js";


export const getUserList = () => {
    return http.request({
        url: "/sys/user/list",
        method: "get",
    });
};
export const login = (data) => {
    return http.request({
        url: "/sys/user/login",
        method: "POST",
        data: data,
    });
};

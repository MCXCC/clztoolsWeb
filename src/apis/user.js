import http from "@/utils/http.js";


export const getUserListApi = () => {
    return http.request({
        url: "/sys/user/list",
        method: "get",
    });
};
export const loginApi = (data) => {
    return http.request({
        url: "/sys/user/login",
        method: "POST",
        data: data,
    });
};

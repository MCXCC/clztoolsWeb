import http from "@/utils/http.js";


export const getDepartmentList = () => {
    return http.request({
        url: "/sys/department/list",
        method: "get",
    });
};

import http from "@/utils/http.js";
export const getMaterialListApi = () => {
    return http.request({
        url: "/material/list",
        method: "get",
    });
};

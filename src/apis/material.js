import http from "@/utils/http.js";
export const getMaterialList = () => {
    return http.request({
        url: "/material/list",
        method: "get",
    });
};

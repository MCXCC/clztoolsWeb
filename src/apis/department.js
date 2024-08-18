import http from "@/utils/http.js";
import { useStore } from "@/store/index";

const store = useStore();


export const getDepartmentListApi = () => {
    return http.request({
        url: "/sys/department/list",
        method: "get",
    });
};

export const addDepartmentApi = (data) => {
    return http.request({
        url: "/sys/department/add",
        method: "post",
        data: data,
    });
};

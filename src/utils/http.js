import axios from "axios";
import router from "@/router/index";
import { baseURL_dev, baseURL_pro, baseURL_test } from "@/utils/baseURL";
import { useStore } from "@/store/index";

class HttpRequest {
    baseURL;
    instance; // 使用any类型替代AxiosInstance

    constructor(type) {
        this.baseURL =
            type === 1 ? baseURL_dev : type === 2 ? baseURL_pro : baseURL_test;
        this.instance = axios.create();
        this.setupInterceptors();
    }

    getInsideConfig() {
        const store = useStore();
        let token = store.user.token;
        if (token) {
            token = "Bearer " + token;
        }
        return {
            baseURL: this.baseURL,
            timeout: 30000,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: token,
            },
        };
    }

    isUserLoggedIn() {
        const store = useStore();
        return !!store.user.token;
    }

    setupInterceptors() {
        this.instance.interceptors.request.use(
            (config) => {
                if (config.url === "/sys/user/login") {
                    return config;
                }

                if (!this.isUserLoggedIn()) {
                    router.push({ path: "/login" });
                    return Promise.reject(new Error("Not logged in"));
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                const { data } = response;
                console.log("返回数据处理", response);
                return data;
            },
            (error) => {
                console.log("error==>", error);
                if (error.response && error.response.status === 401) {
                    const store = useStore()
                    // 清除旧token
                    store.user.token = null
                    router.push("/login");

                } else if (
                    error.response &&
                    [403, 404, 500, 502].includes(error.response.status)
                ) {
                    router.push("/404");
                }
                return Promise.reject(error);
            }
        );
    }

    request(options) {
        options = Object.assign(this.getInsideConfig(), options);
        return this.instance(options);
    }
}

const http = new HttpRequest(1);
export default http;

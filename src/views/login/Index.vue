<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { b64_md5 } from "@/utils/md5.js";
import { loginApi } from "@/apis/user.js";
import { useStore } from "@/store/index";
import router from "@/router/index";

const store = useStore();
const formRef = ref();
const form = ref({});
const data = ref({});
const rules = ref({
    username: [{ required: true, trigger: "blur", message: "请输入账号" }],
    password: [{ required: true, trigger: "blur", message: "请输入密码" }],
});

const onLogin = (formData) => {
    loginApi(formData).then((res) => {
        if (res.code != 200) {
            ElMessage({
                message: res.msg,
                type: "warning",
            });
        } else {
            store.user.token = res.data.data.token;
            store.user.name = res.data.data.name;
            store.user.id = res.data.data.id;
            ElMessage({
                message: "登录成功!",
                type: "success",
            });
            router.push({ name: "home" });
        }
    });
};
const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            data.value.username = form.value.username;
            data.value.password = b64_md5(form.value.password);
            onLogin(data.value);
        } else {
            ElMessage({
                message: "登录失败!",
                type: "warning",
            });
        }
    });
};

onMounted(() => {
    form.value = {
        username: "admin",
        password: "xmgd123",
        token: null,
    };
    if (store.user.token) {
        data.value.token = store.user.token;
        onLogin(data.value);
    }
});
</script>
<template>
    <el-form
        ref="formRef"
        :model="form"
        label-width="auto"
        :rules="rules"
        style="max-width: 600px"
    >
        <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">
                确定
            </el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>

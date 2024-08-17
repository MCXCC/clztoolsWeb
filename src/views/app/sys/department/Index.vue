<script setup>
import router from "@/router/index";
import { onMounted } from "vue";
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
};

onMounted(() => {});
</script>
<template>
    <el-container>
        <el-aside width="200px"
            ><el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
            >
                <el-menu-item
                    :route="{ name: 'department-management' }"
                    index="1"
                >
                    <el-icon><Menu /></el-icon>
                    <span>部门管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<style scoped></style>

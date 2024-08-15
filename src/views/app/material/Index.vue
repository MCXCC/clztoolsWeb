<script setup>
import router from "@/router/index";
import { onMounted } from "vue";
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
};

onMounted(() => {
    router.push({ name: "material-management" });
});
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
                    :route="{ name: 'material-management' }"
                    index="1"
                >
                    <el-icon><Menu /></el-icon>
                    <span>物质管理</span>
                </el-menu-item>
                <el-menu-item :route="{ name: 'material-sell' }" index="2">
                    <el-icon><Sell /></el-icon>
                    <span>物资出借管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<style scoped></style>

<script setup>
import { ref } from "vue";
const activeIndex = ref("1");

const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
};
</script>

<template>
    <el-container>
        <el-header class="header">
            <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                @select="handleSelect"
                router
            >
                <el-menu-item :route="{ name: 'home' }" index="1">
                    首页
                </el-menu-item>
                <el-menu-item :route="{ name: 'material' }" index="2">
                    物质管理系统
                </el-menu-item>
                <el-sub-menu index="3">
                    <template #title>系统管理</template>
                    <el-menu-item :route="{ name: 'user' }" index="3-1">
                        员工管理
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'department' }" index="3-2">
                        部门管理
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-header>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<style scoped></style>

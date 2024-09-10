<script setup>
import { ref } from "vue";
import { useStore } from "@/store/index";
const store = useStore();
const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
};
</script>

<template>
    <el-container>
        <el-header
            style="
                display: inline-flex;
                justify-content: space-between;
                border-bottom: 1px #dedfe6 solid;
            "
        >
            <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                @select="handleSelect"
                router
                style="min-width: 60%"
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
            <div style="display: flex; align-items: center">
                <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    style="margin-right: 10px"
                />
                <span>{{ store.user.name }}</span>
            </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<style scoped></style>

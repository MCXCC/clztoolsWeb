<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { ElButton } from "element-plus";
import { Plus, Upload, Download, Delete } from "@element-plus/icons-vue";
import { getDepartmentList } from "@/apis/department";

const handleDeleteClick = () => {
    console.log(tree.value.getCheckedNodes());
};

const props = {
    value: "id",
    label: "name",
    children: "children",
};
const tree = ref();
const data = ref([]);
const operationVisible = ref(false);
const method = ref("");

const handleOperationClick = (thisMethod) => {
    method.value = thisMethod;
    operationVisible.value = true;
};

const handleUploadClick = () => {};

const handleDownloadClick = () => {};

onMounted(() => {
    getDepartmentList().then((res) => {
        let tree = [];
        const map = new Map();
        res.data.data.forEach((element) => {
            map.set(element.id, element);
        });
        tree = res.data.data.filter((element) => {
            const parent = element.parent ? map.get(element.parent.id) : null;
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(element);
                return false;
            }
            return true;
        });

        data.value = tree;
    });
});
</script>
<template>
    <el-container>
        <el-header>
            <el-row justify="end">
                <el-col :span="12">
                    <el-button
                        type="primary"
                        :icon="Plus"
                        round
                        @click="handleOperationClick('add')"
                        >添加
                    </el-button>
                    <el-button
                        type="danger"
                        :icon="Delete"
                        round
                        @click="handleDeleteClick()"
                        >删除
                    </el-button>
                    <el-button
                        type="warning"
                        :icon="Upload"
                        round
                        @click="handleUploadClick()"
                        >导入
                    </el-button>
                    <el-button
                        type="success"
                        :icon="Download"
                        round
                        @click="handleDownloadClick()"
                        >导出
                    </el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-tree-v2
                ref="tree"
                :props="props"
                show-checkbox
                check-strictly
                :data="data"
                :width="width"
                :height="height"
                fixed
            />
        </el-main>
    </el-container>
</template>

<style scoped></style>

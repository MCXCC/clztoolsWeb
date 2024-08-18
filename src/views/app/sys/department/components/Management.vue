<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { ElButton, TableV2FixedDir } from "element-plus";
import { Plus, Upload, Download, Delete } from "@element-plus/icons-vue";
import { getDepartmentList } from "@/apis/department";
import ManagementForm from "@/views/app/sys/department/components/ManagementForm.vue";

const props = {
    value: "id",
    label: "name",
    children: "children",
};

const data = ref([]);
const treeData = ref([]);
const listData = ref([]);
const operationVisible = ref(false);
const method = ref("");

const columns = [
    {
        key: "id",
        dataKey: "id",
        title: "序号",
        fixed: TableV2FixedDir.LEFT,
        width: 150,
        align: "center",
        flexGrow: 1,
    },
    {
        key: "name",
        dataKey: "name",
        title: "名称",
        width: 150,
        align: "center",
    },
    {
        key: "operations",
        title: "操作",
        fixed: TableV2FixedDir.RIGHT,
        cellRenderer: (data) => (
            <>
                <ElButton size="small" onClick={() => console.log(data)}>
                    编辑
                </ElButton>
                <ElButton
                    size="small"
                    type="danger"
                    onClick={() => console.log(data)}
                >
                    删除
                </ElButton>
            </>
        ),
        width: 200,
        align: "center",
        flexGrow: 1,
    },
];

/**
 * 更新列表数据
 * @param {*} node - 要刷新的节点数据
 */
const refreshListDate = (node) => {
    // 初始化列表数据，只包含传入的节点
    listData.value = [node];
    // 如果节点有子节点，将子节点添加到列表数据中
    listData.value.push(...(node.children || []));
};

const handleDeleteClick = () => {};

const handleOperationClick = (thisMethod) => {
    method.value = thisMethod;
    operationVisible.value = true;
};

const handleUploadClick = () => {};

const handleDownloadClick = () => {};

const handleNodeClick = (node) => {
    refreshListDate(node);
};

onMounted(() => {
    getDepartmentList().then((res) => {
        data.value = res.data.data;
        const map = new Map();
        res.data.data.forEach((element) => {
            map.set(element.id, element);
        });
        treeData.value = res.data.data.filter((element) => {
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
    });
});
</script>
<template>
    <ManagementForm
        v-model:visible="operationVisible"
        v-model:data="data"
        :method="method"
    />
    <el-container>
        <el-header>
            <el-row justify="end">
                <el-col :span="6">
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
            <el-container>
                <el-aside style="min-height: 50vh; width: 200px">
                    <el-tree-v2
                        :props="props"
                        :data="treeData"
                        fixed
                        @node-click="handleNodeClick"
                    />
                </el-aside>
                <el-main>
                    <el-auto-resizer>
                        <template #default="{ height, width }">
                            <el-table-v2
                                :columns="columns"
                                :data="listData"
                                :width="width"
                                :height="height"
                                fixed
                            />
                        </template>
                    </el-auto-resizer>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<style scoped></style>

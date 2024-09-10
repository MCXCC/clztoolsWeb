<script setup lang="jsx">
import ManagementForm from "@/views/app/material/components/ManagementForm.vue";
import { ref, onMounted } from "vue";
import { ElButton, ElMessageBox, TableV2FixedDir } from "element-plus";
import { Plus, Upload, Download } from "@element-plus/icons-vue";
import { getMaterialListApi } from "@/apis/material.js";

const handleSizeChange = (val) => {
    console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`);
};

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
        key: "workshop",
        dataKey: "workshop",
        title: "配属车间",
        width: 150,
        align: "center",
    },
    {
        key: "gang",
        dataKey: "gang",
        title: "配属工班",
        width: 150,
        align: "center",
    },
    {
        key: "name",
        dataKey: "name",
        title: "物资名称",
        width: 150,
        align: "center",
    },
    {
        key: "specification",
        dataKey: "specification",
        title: "规格型号",
        width: 250,
        align: "center",
    },
    {
        key: "number",
        dataKey: "number",
        title: "入库数量",
        width: 150,
        align: "center",
    },
    {
        key: "picture",
        dataKey: "picture",
        title: "图片",
        width: 150,
        align: "center",
    },
    {
        key: "remark",
        dataKey: "remark",
        title: "备注",
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
                    type="warning"
                    onClick={() => console.log(data)}
                >
                    借出
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
const data = ref([]);

const operationVisible = ref(false);
const formTitle = ref("");
const pagination = ref({
    total: 0,
    currentPage: 1,
    pageSize: 10,
});

const handleOperationClick = (method) => {
    if (method === "add") {
        formTitle.value = "添加物资";
        operationVisible.value = true;
    } else {
        ElMessageBox.confirm("错误的method值", "Warning", {
            confirmButtonText: "OK",
            type: "warning",
        });
    }
};

const handleUploadClick = () => {};

const handleDownloadClick = () => {};

onMounted(() => {
    getMaterialListApi().then((res) => {
        data.value = res.data.data;
    });
});
</script>
<template>
    <ManagementForm
        v-model:visible="operationVisible"
        v-model:data="data"
        :title="formTitle"
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
                        >入库
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
            <div style="height: 62vh">
                <el-auto-resizer>
                    <template #default="{ height, width }">
                        <el-table-v2
                            :columns="columns"
                            :data="data"
                            :width="width"
                            :height="height"
                            fixed
                        />
                    </template>
                </el-auto-resizer>
            </div>
        </el-main>
    </el-container>
    <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        size="default"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>

<style scoped></style>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { ElButton, TableV2FixedDir } from "element-plus";
import { Plus, Upload, Download } from "@element-plus/icons-vue";
import { getUserList } from "@/apis/user";

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
        key: "username",
        dataKey: "username",
        title: "用户名",
        width: 150,
        align: "center",
    },
    {
        key: "name",
        dataKey: "name",
        title: "姓名",
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
const data = ref([]);

const operationVisible = ref(false);
const method = ref("");
const pagination = ref({
    total: 0,
    currentPage: 1,
    pageSize: 10,
});

const handleOperationClick = (thisMethod) => {
    method.value = thisMethod;
    operationVisible.value = true;
};

const handleUploadClick = () => {};

const handleDownloadClick = () => {};

onMounted(() => {
    getUserList().then((res) => {
        data.value = res.data.data;
        pagination.value.total = res.data.page.count;
    });
});
</script>
<template>
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

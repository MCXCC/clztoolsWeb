<script setup>
import { ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getDepartmentListApi } from "@/apis/department";
import { Check, Close } from "@element-plus/icons-vue";
import { addDepartmentApi } from "@/apis/department";

const props = defineProps({
    method: {
        type: String,
        required: true,
    },
});
const visible = defineModel("visible", { default: false });
const data = defineModel("data", { required: true });
const formRef = ref();
const isContinue = ref(false);
const form = ref({
    name: "",
    parent: {
        id: "",
    },
});
const rules = ref({
    name: [{ required: true, trigger: "blur" }],
    parent: [],
});
const title = ref("");
const departmentTree = ref([]);

const getDepartmentTree = async () => {
    const response = await getDepartmentListApi();
    const data = response.data.data;

    // 定义转换函数
    const changeData = (element) => {
        return {
            value: element.id,
            label: element.name,
            children: [],
            parent: element.parent ? element.parent.id : null,
        };
    };

    // 创建一个映射表，方便查找父节点
    const map = new Map();
    data.forEach((element) => {
        map.set(element.id, changeData(element));
    });
    // 记录已处理的节点
    const processedNodes = new Set();

    // 构建树形结构
    const tree = data.reduce((acc, element) => {
        const node = map.get(element.id);
        const parent = element.parent ? map.get(element.parent.id) : null;
        // 如果节点已经被处理过，跳过
        if (processedNodes.has(node)) {
            return acc;
        }

        if (parent) {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(node);
            processedNodes.add(node);
        } else {
            acc.push(node);
            processedNodes.add(node);
        }

        return acc;
    }, []);

    return tree;
};
const init = async () => {
    console.log(form.value);
    departmentTree.value = await getDepartmentTree();
    if (props.method === "add") {
        form.value = {
            name: "",
            parent: {
                id: null,
            },
        };
        title.value = "添加部门";
    } else {
        ElMessageBox.confirm("错误的method值", "Warning", {
            confirmButtonText: "OK",
            type: "warning",
        }).then(() => {
            visible.value = false;
        });
    }
};

const onSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            addDepartmentApi(form.value).then((res) => {
                console.log(res);
            });
            ElMessage({
                message: "添加成功",
                type: "success",
            });
            if (isContinue.value) {
                init();
            } else {
                visible.value = false;
            }
        } else {
            ElMessage({
                message: "添加失败!",
                type: "warning",
            });
        }
    });
};

watch(visible, init);
</script>
<template>
    <el-dialog v-model="visible" :title="title" width="500" center>
        <el-form
            ref="formRef"
            :model="form"
            label-width="auto"
            :rules="rules"
            style="max-width: 600px"
        >
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="父级部门" prop="parent">
                <el-tree-select
                    v-model="form.parent.id"
                    :data="departmentTree"
                    check-strictly
                    :render-after-expand="false"
                />
            </el-form-item>
            <el-form-item>
                是否继续填写
                <el-switch
                    v-model="isContinue"
                    class="mt-2"
                    style="margin-left: 8px; padding-right: 24px"
                    inline-prompt
                    :active-icon="Check"
                    :inactive-icon="Close"
                />
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit(formRef)">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped></style>

<script setup>
import { ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

const props = defineProps({
    method: {
        type: String,
        required: true,
    },
});
const formRef = ref();
const visible = defineModel("visible", { default: false });
const data = defineModel("data", { required: true });
const form = ref();
const rules = ref({
    id: [{ required: true }],
    workshop: [{ required: true, trigger: "blur" }],
    gang: [{ required: true, trigger: "blur" }],
    name: [{ required: true, trigger: "blur" }],
    specification: [{ required: true, trigger: "blur" }],
    number: [],
    picture: [],
    remark: [],
});
const title = ref("");

const init = () => {
    if (props.method === "add") {
        form.value = {
            id: data.value?.length > 0 ? String(1 + data.value.at(-1).id) : "1",
            workshop: "运营公务供电分公司变电一车间",
            gang: "新线筹备组",
            name: "",
            specification: "",
            number: 0,
            picture: "",
            remark: "",
        };
        title.value = "添加物资";
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
            ElMessage({
                message: "添加成功",
                type: "success",
            });
            data.value?.push(form.value);
            visible.value = false;
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
            <el-form-item label="序号" prop="id">
                <el-input disabled v-model="form.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所属车间" prop="workshop">
                <el-input v-model="form.workshop" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所属工班" prop="gang">
                <el-input v-model="form.gang" autocomplete="off" />
            </el-form-item>
            <el-form-item label="物资名称" prop="name">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="型号规格" prop="specification">
                <el-input
                    v-model="form.specification"
                    type="textarea"
                    autosize
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="入库数量" prop="number">
                <el-input-number v-model="form.number" :min="0" />
            </el-form-item>
            <el-form-item label="图片" prop="picture">
                <el-input disabled v-model="form.picture" autocomplete="off" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input
                    v-model="form.remark"
                    type="textarea"
                    autosize
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit(formRef)">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped></style>

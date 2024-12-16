<template>
    <div class="container">
        <el-upload class="upload-demo" action="" drag :auto-upload="false" :on-change="uploadChange1" :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
            <el-form-item label="第一个表头" prop="one">
                <el-input v-model="ruleForm.one" />
            </el-form-item>
            <el-form-item label="第二个表头" prop="two">
                <el-input v-model="ruleForm.two" />
            </el-form-item>
            <el-form-item label="第三个表头" prop="three">
                <el-input v-model="ruleForm.three" />
            </el-form-item>
            <el-form-item label="第四个表头" prop="four">
                <el-input v-model="ruleForm.four" />
            </el-form-item>
            <el-form-item label="第五个表头" prop="five">
                <el-input v-model="ruleForm.five" />
            </el-form-item>
            <el-form-item label="第六个表头" prop="six">
                <el-input v-model="ruleForm.six" />
            </el-form-item>
            <el-form-item>
                <el-button @click="getDownList(ruleFormRef)">导出数据</el-button>
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import * as XLSX from "xlsx"; // vue3可用此引入
import { ref, reactive } from "vue";
import { saveAs } from "file-saver";

const ruleForm = reactive({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
});
const ruleFormRef = ref();
const rules = reactive({
    one: [
        {
            required: true,
            trigger: "blur",
            message: "必填",
        },
    ],
    two: [
        {
            required: true,
            trigger: "blur",
            message: "必填",
        },
    ],
    three: [
        {
            required: true,
            trigger: "blur",
            message: "必填",
        },
    ],
    four: [
        {
            required: true,
            trigger: "blur",
            message: "必填",
        },
    ],
    five: [
        {
            required: true,
            trigger: "blur",
            message: "必填",
        },
    ],
    six: [
        {
            required: true,
            trigger: "blur",
            message: "必填",
        },
    ],
});

const arr1 = ref([]);
const list = ref([]);

const uploadChange1 = async (e) => {
    console.log(e);
    const files = e.raw;
    if (files.length <= 0) {
        return false;
    } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
        console.log("上传格式不正确，请上传xls或者xlsx格式");
        return false;
    }
    // 读取表格
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
        const workbook = XLSX.read(ev.target.result, {
            type: "binary",
        });
        const wsname = workbook.SheetNames[0];
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        console.log(ws); // 转换成json的数据
        arr1.value = ws;
        // const m = dealExcel(ws); // ...对数据进行自己需要的操作
        // console.log(m);
    };
    fileReader.readAsBinaryString(files);
};

const getDownList = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            arr1.value.forEach((item) => {
                const a = item[ruleForm.one] - item[ruleForm.four];
                const b = item[ruleForm.two] - item[ruleForm.five];
                const c = item[ruleForm.three] - item[ruleForm.six];
                if (a > -3 && a < 3) return;
                if (b > -3 && b < 3) return;
                if (c > -3 && c < 3) return;
                // if (a > -3 && a < 3 && b > -3 && b < 3 && c > -3 && c < 3) {
                //     return;
                // } else {
                //     list.value.push(item);
                // }
                console.log(item);
                list.value.push(item);
            });
            console.log(list.value);
            // 将数据转换为工作表
            const worksheet = XLSX.utils.json_to_sheet(list.value);

            // 创建工作簿并添加工作表
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            // 生成Excel文件
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

            // 使用file-saver保存文件
            const blob = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            });
            saveAs(blob, "test" + ".xlsx");

            arr1.value = [];
            list.value = [];
        } else {
            console.log("error submit!", fields);
        }
    });
};

const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
}
</style>

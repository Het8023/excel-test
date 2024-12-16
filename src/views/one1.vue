<template>
    <div class="container" v-loading="loading">
        <el-upload class="upload-demo" action="" drag :auto-upload="false" :on-change="uploadChange1" :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <el-upload class="upload-demo" action="" drag :auto-upload="false" :on-change="uploadChange2" :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <el-button @click="getDownList">导出重复数据</el-button>
    </div>
</template>

<script setup>
import * as XLSX from "xlsx"; // vue3可用此引入
import { ref } from "vue";
import { saveAs } from "file-saver";

let loading = ref(false);

const arr1 = ref([]);
const arr2 = ref([]);
const arr = ref([]);

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

const uploadChange2 = async (e) => {
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
        // console.log(ws); // 转换成json的数据
        arr2.value = ws;
        // const m = dealExcel(ws); // ...对数据进行自己需要的操作
        // console.log(m);
    };
    fileReader.readAsBinaryString(files);
};

const getDownList = async () => {
    loading.value = true;
    arr1.value.forEach((item1) => {
        arr2.value.forEach((item2) => {
            if (item2.GeneID == item1.GeneID) {
                arr.value.push(item2);
            }
        });
    });
    console.log(arr.value);
    loading.value = false;
    // 将数据转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(arr.value);

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
};
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
}
</style>

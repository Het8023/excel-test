<template>
    <div class="container" v-loading="loading">
        <el-upload
            class="upload-demo"
            :file-list="fileList"
            action=""
            drag
            :auto-upload="false"
            multiple
            :on-change="uploadChange1"
            :limit="9">
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
const fileList = ref([]);

const uploadChange1 = async (e, list) => {
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
        //   console.log(ws); // 转换成json的数据
        arr1.value.push(ws);
        // const m = dealExcel(ws); // ...对数据进行自己需要的操作
        // console.log(m);
    };
    fileReader.readAsBinaryString(files);
};

const getDownList = async () => {
    const counts = {};
    arr1.value.forEach((array) => {
        array.forEach((obj) => {
            const GeneID = obj.GeneID;
            counts[GeneID] = (counts[GeneID] || 0) + 1;
        });
    });


    const counts2 = {};
    const a = [];
    arr1.value.flat().forEach((obj) => {
        const GeneID = obj.GeneID;
        counts2[GeneID] = (counts2[GeneID] || 0) + 1;
        // console.log(counts2[GeneID]);
        if (counts2[GeneID] == arr1.value.length) {
            a.push(obj);
        }
    });

    // 将数据转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(a);

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
    fileList.value = [];
};
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
}
</style>

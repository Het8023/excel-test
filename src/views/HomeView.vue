<template>
    <div>
        <el-button type="primary" @click="router.push('/one')">筛选重复数据</el-button>
        <el-button type="warning" @click="router.push('/two')">筛选加减数据</el-button>
        <el-button type="danger" @click="router.push('/three')">筛选logFC数据</el-button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss"></style>

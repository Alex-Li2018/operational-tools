<template>
    <div class="tool-btn_wrap">
        <el-button type="info" @click="importArticle">导入文章</el-button>
        <el-button type="info">微信复制</el-button>
        <el-button type="info">保存同步</el-button>
        <el-button type="info">清空内容</el-button>
        <el-button type="info">手机预览</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import crawlerArticle from '@/node_script/crawler.ts';

export default defineComponent({
    setup(props, ctx: SetupContext) {
        function importArticle() {
            crawlerArticle('/api/s?__biz=MzA4NTM2MzQxOQ==&mid=100038721&idx=1&sn=53a1bc72da4997812143919c68b08681&chksm=1fdbc7f528ac4ee38b92bac215bd047cef2e4d673e02706a0c7726fd08e2d4b5849a4c627400#rd', (res) => {
                ctx.emit('importArticle', res);
            });
        }

        return {
            importArticle,
        };
    },
});
</script>

<style lang="scss">
.tool-btn_wrap {
    display: flex;
    flex-direction: column;
    .el-button {
        border-top-left-radius: 0px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 0px;
    }
    .el-button + .el-button {
        margin-left: 0px;
        margin-top: 10px;
    }
}
</style>

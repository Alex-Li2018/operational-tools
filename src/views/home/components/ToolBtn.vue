<template>
    <div class="tool-btn_wrap">
        <el-button
            type="info"
            @click="handlerImportLink">
            导入文章
        </el-button>
        <el-button
            type="info"
            @click="handlerCopy">
            导入复制
        </el-button>
        <el-button
            type="info"
            @click="handlerClear">
            清空内容
        </el-button>
        <el-button type="info">手机预览</el-button>
        <!-- 导入链接 -->
        <ImportLink
            v-model:visible="visible"
            @importArticle="importArticle" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import crawlerArticle from '@/node_script/crawler.ts';
import ImportLink from './ImportLink.vue';

export default defineComponent({
    components: {
        ImportLink,
    },
    setup(props, ctx: SetupContext) {
        const visible = ref(false);
        function handlerImportLink() {
            visible.value = true;
        }

        async function importArticle(url) {
            const res = await crawlerArticle(url);
            // crawlerArticle(url, (res) => {
            //     ctx.emit('importArticle', res);
            // });
        }

        function handlerClear() {
            ctx.emit('importArticle', '');
        }

        async function handlerCopy() {
            const text = await navigator.clipboard.readText();
            ctx.emit('importArticle', text);
        }

        return {
            visible,
            handlerImportLink,
            handlerClear,
            handlerCopy,
            importArticle,
        };
    },
});
</script>

<style lang="scss" scoped>
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

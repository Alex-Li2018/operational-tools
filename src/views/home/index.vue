<template>
    <section class="home_wrap flex_layout_c">
        <div class="rich-text_wrap">
            <RichText v-model="content"/>
            <div class="tool-btn_outer">
                <ToolBtn @importArticle="importArticle" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import RichText from '../../components/RichText.vue';
import ToolBtn from './components/ToolBtn.vue';

export default defineComponent({
    components: {
        RichText,
        ToolBtn,
    },
    setup(props, ctx: SetupContext) {
        const content = ref('');

        function importArticle(res) {
            content.value = res;
        }

        return {
            content,
            importArticle,
        };
    },
});
</script>

<style lang="scss">
.home_wrap {
    .rich-text_wrap {
        width: 500px;
        position: relative;
        .quill-editor {
            display: flex;
            flex-direction: column;
            height: 100vh;
            z-index: 10000;
        }
        .ql-toolbar {
            position: sticky;
            top: 0;
            background: #fff;
        }
        .ql-container {
            flex: 1;
        }
    }
    .tool-btn_outer {
        position: absolute;
        top: 200px;
        right: -98px;
    }
}
</style>

<template>
    <el-dialog
        title="收货地址"
        v-model="dialogVisible"
        :before-close="cancel">
        <el-form
            :model="form">
            <el-form-item
                label="导入链接">
                <el-input
                    v-model="form.link"
                    autocomplete="off">
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer_wrap">
                <el-button
                    @click="cancel">
                    取 消
                </el-button>
                <el-button
                    type="primary"
                    @click="importLink">
                    导入
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import {
 defineComponent, watch, reactive, toRefs,
} from 'vue';
import type { SetupContext } from 'vue';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx: SetupContext) {
        const { visible } = toRefs(props);
        const state = reactive({
            form: {
                link: '',
            },
            dialogVisible: false,
        });

        watch(visible, (newVal) => {
            state.dialogVisible = newVal;
        });

        const cancel = () => {
            state.dialogVisible = false;
            ctx.emit('update:visible', false);
            state.form.link = '';
        };

        const importLink = () => {
            ctx.emit('importArticle', state.form.link);
            cancel();
        };

        return {
            ...toRefs(state),
            cancel,
            importLink,
        };
    },
});
</script>

<style lang="scss" scoped>
.dialog-footer_wrap {
    display: flex;
    justify-content: center;
}
</style>

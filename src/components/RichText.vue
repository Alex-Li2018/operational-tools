<template>
  <div
    class="rich-text_wrap"
    @paste="pasteHandler">
    <div
        id="editorToolbar"
        style="border: 1px solid #ccc"
    />
    <div
        id="editor"
        name="editor"
        style="
            max-width: 100%;
            min-height: 460px;
            border: 1px solid #ccc
        "
    />
  </div>
</template>

<script>
import {
 watch, toRefs, markRaw, defineComponent, onMounted,
} from 'vue';
import { uploadQiniu } from '../utils/qiniuUpload.js';

const E = require('wangeditor');

export default defineComponent({
  name: 'rich-text',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { modelValue } = toRefs(props);
    const wang = markRaw({
      editor: {},
    });

    async function xhrUpload(resultFiles, insertImgFn) {
      const files = resultFiles[0];
      const { name } = files;
      const fileName = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
      const key = `image_${new Date().getTime()}.${fileName}`;
      const res = await uploadQiniu(files, key);
      // 将数据添加到输入框
      const url = `http://imgcdnstatic.top/${res.key}`;
      insertImgFn(url);
    }

    function initEditor() {
      wang.editor = new E('#editorToolbar', '#editor');
      wang.editor.config.zIndex = 1;
      wang.editor.config.menus = [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'todo',
          'justify',
          'quote',
          'emoticon',
          'image',
          'video',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
          '小程序',
      ];
      wang.editor.config.uploadImgShowBase64 = true;
      wang.editor.config.uploadImgMaxSize = 400 * 1024;
      wang.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      wang.editor.config.uploadImgMaxLength = 1;
      wang.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
          xhrUpload(resultFiles, insertImgFn);
      };
      wang.editor.create();
    }

    watch(modelValue, (newVal) => {
      wang.editor.txt.html(newVal);
    });

    onMounted(initEditor);

    return {
      wang,
    };
  },
});
</script>

<style lang="scss" scoped>
.rich-text_wrap {
  width: 980px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  #editor {
    flex: 1;
    margin-bottom: 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>

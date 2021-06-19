<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
import {
 watch, ref, reactive, defineComponent, onMounted, onBeforeMount,
} from 'vue';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill';

const defaultOp = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  },
  placeholder: 'Insert text here ...',
  readOnly: false,
};

// export
export default defineComponent({
  name: 'quill-editor',
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        readOnly: false,
      }),
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({
        readOnly: false,
      }),
    },
  },
  setup(props, ctx) {
    const editor = ref(null); // 这是dom
    const optionsTmp = ref({});
    const contentTmp = ref('');
    const defaultOptions = reactive(defaultOp);
    const quillInstance = ref({});

    onBeforeMount(() => {
      quillInstance.value = {};
    });

    function initialize() {
      // Options
        optionsTmp.value = { ...defaultOptions, ...props.globalOptions, ...props.options };
        // Instance
        quillInstance.value = new Quill(editor.value, optionsTmp.value);

        quillInstance.value.enable(false);
        // Set editor content
        if (props.modelValue || contentTmp) {
          quillInstance.value.pasteHTML(props.modelValue.value || contentTmp.value);
        }
        // Disabled editor
        if (!props.disabled) {
          quillInstance.value.enable(true);
        }
        // Mark model as touched if editor lost focus
        quillInstance.value.on('selection-change', (range) => {
          if (!range) {
            ctx.emit('blur', quillInstance.value);
          } else {
            ctx.emit('focus', quillInstance.value);
          }
        });
        // Update model if text changes
        quillInstance.value.on('text-change', () => {
          let html = editor.value.children[0].innerHTML;

          const text = quillInstance.value.getText();
          if (html === '<p><br></p>') html = '';
          contentTmp.value = html;
          ctx.emit('update:modelValue', contentTmp.value);
          ctx.emit('change', { html, text, quillInstance: quillInstance.value });
        });
        // Emit ready event
        ctx.emit('ready', quillInstance.value);
    }

    onMounted(initialize);

    watch(() => props.modelValue, (newVal) => {
      if (Object.keys(quillInstance).length) {
        if (newVal && newVal !== contentTmp.value) {
          contentTmp.value = newVal;
          quillInstance.value.pasteHTML(newVal);
        } else if (!newVal) {
          quillInstance.value.setText('');
        }
      }
    });

    watch(() => props.disabled, (newVal) => {
      if (Object.keys(quillInstance).length) {
        quillInstance.value.enable(!newVal);
      }
    });

    return {
      optionsTmp: {},
      contentTmp: '',
      defaultOptions,
      editor,
    };
  },
});
</script>

<template>
    <section class="home_wrap">
        <div class="rich-text_wrap">
            <RichText />
        </div>
    </section>
</template>

<script>
import RichText from '@/components/RichText';

export default {
  components: {
    RichText,
  },
};
</script>

<style lang="scss">
.home_wrap {
    .rich-text_wrap {
        width: 500px;
        .quill-editor {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .ql-container {
            flex: 1;
        }
    }
}
</style>

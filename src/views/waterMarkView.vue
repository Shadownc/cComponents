<template>
    <div>
        <waterMark ref="watermark" inputText="这是水印" :inputDestroy="true"></waterMark>
    </div>
</template>

<script>
import waterMark from "@/components/waterMark.vue";
export default {
    components: {
        waterMark,
    },
    beforeDestroy() {
        this.$refs.watermark.removeMaskDiv();
    },
};
</script>

<style lang="scss" scoped></style>
<template>
    <div ref="seal">

    </div>
</template>

<script>
import { Seal } from '@pansy/seal';
export default {
    props: {
        sealConfig: {
            type: Object,
            default: () => ({
                "type": "company",
                "shape": "circle",
                "showTransparent": true,
                "color": "red",
                "width": 300,
                "height": 300,
                "border": {
                    "visible": true,
                    "color": "red",
                    "width": 6,
                    "radius": 140
                },
                "innerBorder": {
                    "visible": true,
                    "color": "red",
                    "width": 1,
                    "radius": 130
                },
                "innerLoopLine": {
                    "visible": false,
                    "color": "red",
                    "width": 2,
                    "radius": 80
                },
                "fiveStar": {
                    "visible": true,
                    "color": "red",
                    "size": 30
                },
                "text": {
                    "visible": true,
                    "color": "red",
                    "radius": 120,
                    "text": "超级无敌爱国创新科技有限公司",
                    "fontSize": 30,
                    "startDegree": 25,
                    "fontWeight": 600
                },
                "subText": {
                    "visible": true,
                    "color": "red",
                    "text": "合同专用章",
                    "fontSize": 24,
                    "distance": 75,
                    "fontWeight": 600
                },
                "centerText": {
                    "visible": false,
                    "color": "red",
                    "text": "测试文案",
                    "fontSize": 24
                },
                "serNo": {
                    "visible": true,
                    "color": "red",
                    "radius": 120,
                    "text": "01234566667890",
                    "fontSize": 18,
                    "startDegree": 45,
                    "fontWeight": 600
                }
            })
        }
    },
    watch: {
        sealConfig: {
            handler: function (v) {
                this.seal.update(v)
            },
            deep: true
        }
    },
    data() {
        return {
            seal: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.seal = new Seal(this.$refs.seal, this.sealConfig);
            // console.log(this.seal);
        })

    },
}
</script>

<style lang="scss" scoped></style>
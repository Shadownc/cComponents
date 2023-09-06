<template>
    <div class="wrapper">
        <img :src="milkywayImg" alt class="milkywayImg">
        <img :src="globeGif" alt class="globelGif">
        <div class="zoetrope-wrapper">
            <div :class="['zoetrope', rotateName]" ref="zoetrope" @mouseleave="mouseleave" @mouseenter="mouseenter">
                <div v-for="(item, index) of governments" :key="index" @click="showSelf(index, item)"
                    @mouseenter="mouseenterSingle">
                    <p class="item-title">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import milkywayImg from 'assets/images/image_milkyway@2x.png';
import globeGif from 'assets/images/globe.gif';

export default {
    data: () => ({
        milkywayImg,
        globeGif,
        isRotate: true,
        rotateName: 'rotateInit',
        nowIndex: -1,
        timer: null,
        overSingle: false,
        governments: [
            {
                name: '我是1号'
            },
            {
                name: '我是2号'
            },
            {
                name: '我是3号'
            },
            {
                name: '我是4号'
            },
            {
                name: '我是5号'
            },
            {
                name: '我是6号'
            },
            {
                name: '我是7号'
            }
        ]
    }),
    methods: {
        showSelf(index) {
            if (this.nowIndex !== index) {
                this.isRotate = true;
            }
            const unitSum = 7;
            const unit = 360 / unitSum;
            if (this.isRotate) {
                // this.rotateName = `rotate${index + 1}`;
                this.$refs.zoetrope.style.transform = `rotateY(${unit *
                    (unitSum - index)}deg)`;
                this.isRotate = false;
                this.nowIndex = index;
            }
        },
        mouseenter() {
            clearTimeout(this.timer);
        },
        mouseenterSingle() {
            this.overSingle = true;
        },
        mouseleave() {
            if (this.timer) {
                this.isRotate = false;
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.rotateName = 'rotateInit';
                if (!this.overSingle) {
                    this.isRotate = true;
                }
            }, 1000);
        }
    }
};
</script>
  
  
<style lang="less" scoped>
@sum: 7;
@unit: 360 / @sum;


.wrapper {
    width: 100%;
    height: 100%;
    background-image: url('~assets/images/image_background@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
}



.milkywayImg {
    width: 1050px;
    height: 430px;
    position: absolute;
    left: 0;
    right: 0;
    top: 268px;
    margin: 0 auto;
}

.globelGif {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 100px;
    width: 900px;
}

.zoetrope-wrapper {
    perspective: 800px;
    perspective-origin: 50% -50%;
}

.zoetrope {
    margin: 211px auto;
    position: relative;
    height: 300px;
    transform-style: preserve-3d;
    // border: 1px solid red;
}

.zoetrope div {
    position: absolute;
    width: 129px;
    height: 155px;
    left: calc(50% - 65px);
    transform-origin: 50% 0;
    background-image: url('~assets/images/single.png');
    background-size: 100%;
    background-repeat: no-repeat;
    transform-style: preserve-3d;
    cursor: pointer;
}

.item-title {
    width: 90px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.zoetrope:hover {
    animation-play-state: paused;
}

@keyframes zoetrope {
    100% {
        transform: rotateY(36000deg);
    }
}

.rotateInit {
    animation: zoetrope 4000s linear infinite;
}

.zoetropeLoop(@i) when (@i > 0) {
    div:nth-child(@{i}) {
        transform: rotateY((@unit * (@i - 1)) + 0deg) translateZ(440px);
    }

    .zoetropeLoop((@i - 1));
}

.zoetrope {
    .zoetropeLoop(@sum)
}
</style>
  
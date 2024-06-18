<template>
    <div class="p-7">
        <el-row>
            <el-col>
                <el-alert title="请勿用于违法用途！！！请勿用于违法用途！！！请勿用于违法用途！！！" type="error" center :closable="false">
                </el-alert>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="mt-4 border border-[#eaeefb]">
            <el-col :span="6" class="py-4 border-r border-[#eaeefb]">
                <seal ref="sealRef" :sealConfig="sealConfig"></seal>
            </el-col>
            <el-col :span="16" class="p-4 max-h-[800px] overflow-auto">
                <el-scrollbar style="height:100%">
                    <div class="flex justify-between items-center px-2">
                        <div class="text-base font-bold">配置面板</div>
                        <div>
                            <el-button type="text" @click="downloadSeal">下载印章</el-button>
                            <el-button type="text" @click="copyConfig">复制配置</el-button>
                        </div>
                    </div>
                    <div class="text-sm font-bold mt-4">基本配置</div>
                    <el-form label-position="top" label-width="80px" :model="sealConfig" class="!overflow-x-hidden">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <el-form-item label="印章类型">
                                    <el-select v-model="sealConfig.type" placeholder="请选择">
                                        <el-option v-for="item in yzType" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="印章形状">
                                    <el-select v-model="sealConfig.shape" placeholder="请选择">
                                        <el-option v-for="item in yzShape" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>

                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="显示透明背景">
                                    <el-switch v-model="sealConfig.showTransparent"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item>
                                    <template #label>
                                        <div>印章颜色
                                            <el-tooltip class="item" effect="dark" content="改变颜色会同步修改以下所有颜色"
                                                placement="top">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                    <el-color-picker v-model="sealConfig.color" show-alpha :predefine="predefineColors"
                                        @change="colorChange">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="画布宽度">
                                    <el-input v-model="sealConfig.width" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="画布高度">
                                    <el-input v-model="sealConfig.height" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">边线配置</div>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.border.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.border.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="线宽">
                                    <el-input v-model="sealConfig.border.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item>
                                    <template #label>
                                        <div>半径
                                            <el-tooltip class="item" effect="dark" content="半径不能超过画布宽高，并且包含线条宽度"
                                                placement="top">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </div>
                                    </template>
                                    <el-input v-model="sealConfig.border.radius"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">内边线配置</div>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.innerBorder.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.innerBorder.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="线宽">
                                    <el-input v-model="sealConfig.innerBorder.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="半径">
                                    <el-input v-model="sealConfig.innerBorder.radius"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">内环线配置</div>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.innerLoopLine.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.innerLoopLine.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="线宽">
                                    <el-input v-model="sealConfig.innerLoopLine.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="半径">
                                    <el-input v-model="sealConfig.innerLoopLine.radius"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">五角星配置</div>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.fiveStar.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.fiveStar.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="大小">
                                    <el-input v-model="sealConfig.fiveStar.size"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">主文字配置</div>
                        <el-row :gutter="20">
                            <el-col :span="3">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.text.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.text.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="半径">
                                    <el-input v-model="sealConfig.text.radius"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="文案">
                                    <el-input v-model="sealConfig.text.text"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体大小">
                                    <el-input v-model="sealConfig.text.fontSize"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体开始角度">
                                    <el-input v-model="sealConfig.text.startDegree"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体粗细">
                                    <el-input v-model.number="sealConfig.text.fontWeight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">副文字配置</div>
                        <el-row :gutter="20">
                            <el-col :span="3">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.subText.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.subText.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="文案">
                                    <el-input v-model="sealConfig.subText.text"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体大小">
                                    <el-input v-model="sealConfig.subText.fontSize"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="距离">
                                    <el-input v-model.number="sealConfig.subText.distance"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体粗细">
                                    <el-input v-model.number="sealConfig.subText.fontWeight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">中心文字配置</div>
                        <el-row :gutter="20">
                            <el-col :span="3">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.centerText.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.centerText.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="文案">
                                    <el-input v-model="sealConfig.centerText.text"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体大小">
                                    <el-input v-model="sealConfig.centerText.fontSize"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体粗细">
                                    <el-input v-model.number="sealConfig.centerText.fontWeight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="text-sm font-bold">序列号配置</div>
                        <el-row :gutter="20">
                            <el-col :span="3">
                                <el-form-item label="是否显示">
                                    <el-switch v-model="sealConfig.serNo.visible"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="颜色">
                                    <el-color-picker v-model="sealConfig.serNo.color" show-alpha
                                        :predefine="predefineColors">
                                    </el-color-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="半径">
                                    <el-input v-model="sealConfig.serNo.radius"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="文案">
                                    <el-input v-model="sealConfig.serNo.text"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体大小">
                                    <el-input v-model="sealConfig.serNo.fontSize"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体开始角度">
                                    <el-input v-model="sealConfig.serNo.startDegree"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="字体粗细">
                                    <el-input v-model.number="sealConfig.serNo.fontWeight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-scrollbar>


            </el-col>
        </el-row>


    </div>
</template>

<script>
import seal from '@/components/seal.vue'
import { copyTextToClipboard, downloadImage } from '@/utils'
export default {
    components: {
        seal,
    },
    data() {
        return {
            yzType: [
                {
                    label: '公司印章',
                    value: 'company'
                },
                {
                    label: '个人印章',
                    value: 'personal'
                }
            ],
            yzShape: [
                {
                    label: '圆形',
                    value: 'circle'
                },
                {
                    label: '椭圆',
                    value: 'ellipse'
                },
                {
                    label: '方形',
                    value: 'square'
                }
            ],
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            sealConfig: {
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
            }
        }
    },
    methods: {
        colorChange(v) {
            this.$set(this.sealConfig.border, 'color', v)
            this.$set(this.sealConfig.innerBorder, 'color', v)
            this.$set(this.sealConfig.innerLoopLine, 'color', v)
            this.$set(this.sealConfig.fiveStar, 'color', v)
            this.$set(this.sealConfig.text, 'color', v)
            this.$set(this.sealConfig.subText, 'color', v)
            this.$set(this.sealConfig.centerText, 'color', v)
            this.$set(this.sealConfig.serNo, 'color', v)
        },
        downloadSeal() {
            let baseData = this.$refs.sealRef.seal.toBase64();
            downloadImage(baseData)
        },
        copyConfig() {
            copyTextToClipboard(`const sealConfig=${JSON.stringify(this.sealConfig)}`)
        }
    },
}
</script>

<style lang="scss">
.el-scrollbar__wrap {
    overflow-x: hidden !important;
}
</style>
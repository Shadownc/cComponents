import request from '@/utils/request'

export function getMapFullData(areaCode) {
    return request({
        url: `https://geo.datav.aliyun.com/areas_v3/bound/${areaCode}_full.json`,
        method: 'get'
    })
}
export function getMapData(areaCode) {
    return request({
        url: `https://geo.datav.aliyun.com/areas_v3/bound/${areaCode}.json`,
        method: 'get'
    })
}
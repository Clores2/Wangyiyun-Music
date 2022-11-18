import service from "../index";

//获取首页轮播图
export function getBanner() {
    return service({
        method: 'get',
        url:'/banner?type=2',

    })
}
//获取发现好歌单
export function getMusicList() {
    return service({
        method: 'get',
        url:'/personalized?limit=10',

    })
}

import service from "..";

//获取歌单详情
export function getMusicListDetail(id) {
    return service({
        method: 'get',
        url:`/playlist/detail?id=${id}`,

    })
}
//获取歌单所有歌曲数据
export function getMusicplaylistSongs(id) {
    return service({
        method: 'get',
        url:`/playlist/track/all?id=${id}&limit=30&offset=0`,

    })
}

//获取音乐歌词
export function getLyric(id) {
    return service({
        method: 'get',
        url:`/lyric?\id=${id}`,

    })
}
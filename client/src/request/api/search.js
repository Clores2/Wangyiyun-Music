import service from "..";

//获取搜索结果
export function getSearchRes(keyword) {
    return service({
        method: 'get',
        url:`/search?keywords=${keyword}&limit=30`,

    })
}
//注册组件
import { Swipe, SwipeItem ,Popup, NoticeBar,Form,Field, CellGroup,Button,Toast,Search  } from "vant";

let vantItem = [Swipe, SwipeItem,Popup,NoticeBar,Form,Field, CellGroup,Button,Toast,Search ];
export default function getVant(app) {
    vantItem.forEach(item => {
        app.use(item);
    })
}
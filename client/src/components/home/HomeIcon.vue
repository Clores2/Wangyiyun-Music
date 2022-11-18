<template>
    <div class="homeIcon">
        <div class="item">
            <div class="iconOut">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-rili"></use>
            </svg>
            
        </div>
        <span>每日推荐</span>
        </div>
        <div class="item">
            <div class="iconOut">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-diantai1"></use>
            </svg>
            
        </div>
        <span>私人FM</span>
        </div>
        <div class="item">
        
            <div class="iconOut">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tingge"></use>
                 </svg>
                 
            </div>
            <span>歌单</span>
        </div>
        <div class="item">
            <div class="iconOut">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-daochu1024-02"></use>
            </svg>
            
            </div>
            <span>排行榜</span>
        </div>
        

    </div>
    <hr>
</template>


<style lang="less" scoped>
.homeIcon{
    width: 100%;
    height: 2rem;
    padding: .2rem .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .iconOut{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: rgb(247, 219, 219);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon{
            height: .7rem;
            width: .7rem;
        }
        
    }
        span{
                font-size: .15rem;
                
            }
        }
        
    
}
hr{
    background-color: rgb(231, 226, 226);
    opacity: 0.1;
}
</style>
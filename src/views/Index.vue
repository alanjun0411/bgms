<template>
    <div class="index">
        <div class="indexMain">
            <div class="mainTop">
                <img src="../assets/mylogo.png" alt="">
                <span>无象限科技</span>
            </div>
            <div class="mainBottom">
                让科技不被定义，让科技改变未来。
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.index{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    .indexMain{
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .mainTop{
            display: flex;
            align-items: flex-end;
            img{
                width: 200px;
                height: 200px;
            }
            span{
                font-size: 80px;
                font-weight: 700;
                margin-left: 20px;
            }
        }
        .mainBottom{
            font-size: 40px;
            margin-top: 30px;
            margin-left: 40px;
            color: #52b7f5;
        }
    }
}
</style>

<template> 
    <div class="app-container">       
        <h3>轮播图列表</h3>

        <!-- 表格 -->
        <el-table
            :data="list"
            border
            fit
            highlight-current-row> 
            <el-table-column
                label="序号"
                width="70"
                align="center">

                <template slot-scope="scope">
                    {{scope.$index + 1 }}
                </template>

            </el-table-column> 

            <el-table-column prop="title" label="标题" align="center"/>

            <el-table-column prop="" label="图片" width="500" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.imgUrl">
                </template>
            </el-table-column>

     

            <el-table-column label="操作" width="200" align="center">\

                <template slot-scope="scope">
                    <router-link :to="'/banner/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除                 
                    </el-button>
                </template>

            </el-table-column>
        </el-table>


        <!-- 分页 -->
        <!-- <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
        /> -->
    </div>
</template>

<script>
// 引入调用teacher.js文件
import bannerApi from '@/api/edu/banner'

export default {
    // 写核心代码位置

    // data:{

    // },
    data(){//定义变量和初始值
        return{

            list:null,//查询之后接口返回集合
            // page:1,//当前页
            // limit:5,//每页记录数
            // total:0,//总记录数
            items:{
            },//条件封装对象
        }
    },
    created(){//页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList()
    },
    methods:{//创建具体的方法，调用banner.js定义的方法
        //轮播图列表的方法
        getList(page = 1){
            this.page = page
            bannerApi.getBannerList(this.items)
                    .then(response =>{
                        //reponse接口返回的数据
                        //console.log(response)
                        this.list = response.data.items
                        // console.log(this.list)
                        // this.total = response.data.total
                        // console.log(this.total)
                    })//请求成功
                    // .catch(error  =>{
                    //     console.log(error)
                    // })//请求失败
        },
        resetData(){//清空
            // 表单输入项数据清空
            this.teacherQuery = {}
            // 查询所有讲师数据
            this.getList()
        },
        //删除轮播图的方法
        removeDataById(id){
            // alert(id)
            this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定，执行then方法
                //调用删除的方法
                // alert(id)
                bannerApi.deleteBannerId(id)
                    .then(response =>{//删除成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        // 回到列表页面
                        this.getList()
                    })                   
            })//点击取消，执行catch方法     
        }
    }
}
</script>
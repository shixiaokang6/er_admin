<template> 
    <div class="app-container">       
        <h3>用户积分列表</h3>


        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline"> 
            <el-form-item> 
                <el-input v-model="creditQuery.username" placeholder="请输入用户名"/>
            </el-form-item>
            
            <el-button type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>



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
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>

            </el-table-column> 

            <el-table-column prop="username" label="用户名" width="200" align="center"/>

            <el-table-column prop="income" label="收入" width="100" align="center"/>

            <el-table-column prop="outcome" label="支出" width="100" align="center"/>

            <el-table-column prop="describe" label="描述" align="center"/>

            <el-table-column prop="createTime" label="更新时间" width="200" align="center"/>

             <el-table-column prop="residual" label="剩余积分" width="100" align="center"/>

            <!-- <el-table-column label="操作" align="center">\

                <template slot-scope="scope">
                    <router-link :to="'/teacher/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">审核</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除                 
                    </el-button>
                </template>

            </el-table-column> -->
        </el-table>


        <!-- 分页 -->
        <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
        />
    </div>
</template>

<script>
// 引入调用teacher.js文件
import creditApi from '@/api/edu/credit'

export default {
    // 写核心代码位置

    // data:{

    // },
    data(){//定义变量和初始值
        return{

            list:null,//查询之后接口返回集合
            page:1,//当前页
            limit:5,//每页记录数
            total:0,//总记录数
            creditQuery:{

            }
        }
    },
    created(){//页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList()
    },
    methods:{//创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        getList(page = 1){
            this.page = page
            creditApi.getCreditListPage(this.page,this.limit,this.creditQuery)
                    .then(response =>{
                        //reponse接口返回的数据
                        //console.log(response)
                        this.list = response.data.rows
                        console.log(this.list)
                        this.total = response.data.total
                        console.log(this.total)
                    })//请求成功
                    // .catch(error  =>{
                    //     console.log(error)
                    // })//请求失败
        },
        resetData(){//清空
            // 表单输入项数据清空
            this.creditQuery = {}
            // 查询所有讲师数据
            this.getList()
        }
    }
}
</script>
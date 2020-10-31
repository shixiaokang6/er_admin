<template> 
    <div class="app-container">       
        <h3>用户列表</h3>


        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline"> 
            <el-form-item> 
                <el-input v-model="studentQuery.username" placeholder="用户姓名"/>
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

            <el-table-column prop="username" label="用户名" width="130" align="center"/>

            <!-- <el-table-column prop="erUser.password" label="密码" align="center"/> -->

            <el-table-column prop="phoneNum" label="手机号" align="center" width="110"/>

            <el-table-column prop="address" label="联系地址" align="center"/>

            <el-table-column prop="age" label="年龄" align="center"/>

            <el-table-column label="性别" align="center"> 
                <template slot-scope="scope">
                    {{ scope.row.gender===0?'男':'女' }}
                </template>
            </el-table-column>

            <el-table-column prop="email" label="邮箱" width="160" align="center"/>

            <el-table-column prop="school" label="所在学校" width="150" align="center"/>

            <el-table-column prop="introduce" label="自我介绍" width="320" align="center"/>

            
            <el-table-column label="操作" width="200" align="center">\

                <template slot-scope="scope">
                    <router-link :to="'/student/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除                 
                    </el-button>
                </template>

            </el-table-column>
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
// 引入调用student.js文件
import studentApi from '@/api/edu/student'

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
            studentQuery:{
            }//条件封装对象
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
            studentApi.getStudentListPage(this.page,this.limit,this.studentQuery)
                    .then(response =>{
                        //reponse接口返回的数据
                        //console.log(response)
                        console.log(this.list)
                        this.list = response.data.row 
                        this.total = response.data.total
                        console.log(this.total)
                    })//请求成功
                    // .catch(error  =>{
                    //     console.log(error)
                    // })//请求失败
        },
        resetData(){//清空
            // 表单输入项数据清空
            this.studentQuery = {}
            // 查询所有讲师数据
            this.getList()
        },
        //删除讲师的方法
        removeDataById(id){
            // alert(id)
            this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定，执行then方法
                //调用删除的方法
                // alert(id)
                studentApi.deleteStudentId(id)
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
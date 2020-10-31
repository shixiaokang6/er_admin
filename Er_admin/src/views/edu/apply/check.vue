<template> 
    <div class="app-container">       
        <h3>教师审核列表</h3>


        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline"> 
            <el-form-item> 
                <el-input v-model="teacherQuery.realName" placeholder="讲师名"/>
            </el-form-item>
            
            <el-button type="primary" icon="el-icon-search" @click="getCheckList()">查 询</el-button>
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

            <el-table-column prop="realName" label="真实姓名" align="center"/>


            <!-- <el-table-column prop="uid" label="用户id" width="160" align="center"/> -->

            <!-- <el-table-column prop="Img" label="图片url" width="60" /> -->

            <el-table-column label="认证类型" width="80" align="center"> 
                <template slot-scope="scope">
                    {{ scope.row.sort===0?'老师':(scope.row.sort===1?'学生':'大学生') }}
                </template>
            </el-table-column>

            <el-table-column prop="certificationDate" label="申请时间" align="center"/>
            
            <el-table-column label="认证状态" width="80" align="center"> 
                <template slot-scope="scope">
                    {{ scope.row.statue===0?'未认证':(scope.row.statue===1?'审核中':'通过') }}
                </template>
            </el-table-column>


            <el-table-column prop="teacherId" label="教师编号" align="center"/>

            <el-table-column label="操作" width="200" align="center">\

                <template slot-scope="scope">
                    <!-- <router-link :to="'/teacher/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="check(scope.rows.id)">审核</el-button>
                    </router-link> -->

                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="check(scope.row.id)">审核</el-button>

                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="uncheck(scope.row.id)">驳回                 
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
            @current-change="getCheckList"
        />
    </div>
</template>

<script>
// 引入调用teacher.js文件
import applyApi from '@/api/edu/apply'

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
            teacherQuery:{
                id: ""
            }//条件封装对象
        }
    },
    created(){//页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getCheckList()
    },
    methods:{//创建具体的方法，调用teacher.js定义的方法
        //讲师审核列表的方法
        getCheckList(page = 1){
            this.page = page
            applyApi.getCheckTeacherListPage(this.page,this.limit,this.teacherQuery)
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
            this.teacherQuery = {}
            // 查询所有讲师数据
            this.getCheckList()
        },
        // 审核
        check(id){
            this.$confirm('通过审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定，执行then方法
                //调用删除的方法
                // alert(id)
                applyApi.checkTeacherId(id)
                    .then(response =>{//删除成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        // 回到列表页面
                        this.getCheckList()
                    })                   
            })//点击取消，执行catch方法 
        },
        // 驳回
        uncheck(id){
            this.$confirm('审核驳回, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定，执行then方法
                //调用删除的方法
                // alert(id)
                applyApi.uncheckTeacherId(id)
                    .then(response =>{//删除成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        // 回到列表页面
                        this.getCheckList()
                    })                   
            })//点击取消，执行catch方法 
        }
    }
}
</script>
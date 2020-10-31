<template> 
    <div class="app-container">       
        <h3>用户反馈列表</h3>


        <!--查询表单-->
        <!-- <el-form :inline="true" class="demo-form-inline"> 
            <el-form-item> 
                <el-input v-model="teacherQuery.realName" placeholder="用户名"/>
            </el-form-item>
            
            <el-button type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form> -->



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

            <el-table-column prop="username" label="用户名" width="160" align="center"/>


            <el-table-column prop="feedbackInfo" label="反馈信息" width="500" align="center"/>

            <el-table-column prop="feedbackTime" label="反馈时间" width="160" align="center"/>

            <el-table-column prop="reply" label="回复信息" width="500" align="center"/>
           
            <el-table-column prop="replyTime" label="回复时间" width="160" align="center"/>

            <!-- <el-table-column label="是否回复" align="center"> 
                <template slot-scope="scope">
                    {{ scope.row.statue===0?'未回复':'已回复' }}
                </template>
            </el-table-column> -->

            <el-table-column prop="statue" label="是否回复" align="center"/>

            

            <el-table-column label="操作" width="200" align="center">\

                <template slot-scope="scope">
                    <router-link :to="'/feedback/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">回复</el-button>
                    </router-link>

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


        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

        <!-- 回复弹框 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <!-- <span>这是一段信息</span> -->
        <el-form label-width="120px">
                <el-form-item label="用户名">
                        <el-input/>
                    </el-form-item>
                    
                    <el-form-item label="回复信息"> 
                        <el-input :rows="10" type="textarea"/>
                    </el-form-item>

                    <el-form-item label="回复时间">
                        <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>   
                    </el-form-item>

                    
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入调用teacher.js文件
import feedbackApi from '@/api/edu/feedback'

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
            dialogVisible: false,

            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
                value1: '',
                value2: '',
                value3: ''
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
            feedbackApi.getFeedBackListPage(this.page,this.limit)
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
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
      }
    }
}
</script>
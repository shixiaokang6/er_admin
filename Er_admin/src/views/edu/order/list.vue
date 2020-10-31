<template> 
    <div class="app-container">       
        <h3>订单信息列表</h3>


        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline"> 
            <el-form-item> 
                <el-input v-model="orderQuery.publisher" placeholder="请输入发布人"/>
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

            <el-table-column prop="oid" label="订单号" width="170" align="center"/>

            <el-table-column prop="username" label="发布人" width="100" align="center"/>

            <el-table-column prop="classNum" label="课时数" width="80" align="center"/>

            <el-table-column prop="hourWage" label="时薪" width="80" align="center"/> 

            <!-- <el-table-column prop="applicationNum" label="申请数" width="80" align="center"/> -->

            <el-table-column prop="grade" label="年级" width="50" align="center"/> 

            <el-table-column prop="subject" label="科目" width="50" align="center"/> 

            

            <el-table-column  prop="province,city,country,detailAddress" label="地址" align="center"> 
                <template slot-scope="scope">
                    {{scope.row.province}}{{scope.row.city}}{{scope.row.country}}{{scope.row.detailAddress}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="province" label="省" width="80" align="center"/> 

            <el-table-column prop="city" label="市" width="80" align="center"/> 

            <el-table-column prop="country" label="县" width="80" align="center"/> 
           
            <el-table-column prop="detailAddress" label="地址" width="80" align="center"/>  -->

            <el-table-column prop="publishTime" label="发布时间" width="160" align="center"/>  

            <el-table-column prop="classTime" label="上课时间" width="160" align="center"/>

            <!-- <el-table-column prop="statue" label="订单状态" width="100" align="center"/> -->



            <el-table-column label="订单状态" align="center"> 
                <template slot-scope="scope">
                    {{ scope.row.statue===0?'未完成':(scope.row.statue===1?'未授课':'已完成') }}
                </template>
            </el-table-column>
            <el-table-column prop="note" label="备注" width="150" align="center"/>

        
            <el-table-column label="操作" align="center">\

                <template slot-scope="scope">
                    <router-link :to="'/order/edit/'+scope.row.oid">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>

                    <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除                 
                    </el-button> -->
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
// 引入调用teacher.js文件
import orderApi from '@/api/edu/order'

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
            orderQuery:{
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
            orderApi.findAllOrder(this.page,this.limit,this.orderQuery)
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
            this.orderQuery = {}
            // 查询所有讲师数据
            this.getList()
        }
    }
}
</script>
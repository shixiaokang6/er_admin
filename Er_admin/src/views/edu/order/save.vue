<template> 
    <div class="app-container">
        <h3>订单信息编辑</h3>

        <template>
            <div class="app-container">
                <el-form label-width="120px">
                    <el-form-item label="订单id">
                        <el-input v-model="Order.oid"/>
                    </el-form-item>
                    
                    <el-form-item label="省">
                        <el-input v-model="Order.province"/>
                    </el-form-item>

                    <el-form-item label="市(直辖市)"> 
                        <el-input v-model="Order.city"/>
                    </el-form-item> 


                    <el-form-item label="县(区)"> 
                        <el-input v-model="Order.country"/>
                    </el-form-item> 
                       

                    <el-form-item label="详细地址"> 
                        <el-input v-model="Order.detailAddress"/>
                    </el-form-item> 
  



                    <!-- <el-form-item label="上课时间"> 
                        <el-input v-model="Order.classTime"/>
                    </el-form-item>  -->

                    <el-form-item label="备注"> 
                        <el-input v-model="Order.note"/>
                    </el-form-item> 


                    <el-form-item>
                        <el-button :disabled="saveBtnDisabled" type="primary"
                            @click="updateTask">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </div>
</template>

<script>

import orderApi from '@/api/edu/order'


export default {
    data(){
        return{
            Order:{

            },
            BASE_API:process.env.BASE_API,//获取dev.env.js里面地址
            saveBtnDisabled:false//保存按钮是否禁用
        }
    },
    created(){//页面渲染之前执行

        this.init()
       
    },
    methods:{

        init(){
            if (this.$route.params.oid) {
            // 从路径获取id值
            const id = this.$route.params.oid
            // 调用根据id查询的方法
            this.findTaskById(id) 
            }
        },
    
        // 根据讲师id查询的方法
        findTaskById(id){
            orderApi.getOrderInfo(id)
                .then(response =>{
                    this.Order = response.data.Order
                    console.log("=========" + response.data.Order)
                })
        },
        
        // 修改订单的方法
        updateTask(){
            orderApi.updateOrder(this.Order)
                .then(response =>{
                    //提示信息
                    this.$message({ 
                        type: 'success',
                        message: '修改成功!'
                    });
                    //回到列表页面  路由跳转
                    this.$router.push({path:'/order/table'})
                })
        }
    }
}
</script>
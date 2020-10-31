<template> 
    <div class="app-container">
        <h3>用户反馈信息回复</h3>

        <template>
            <div class="app-container">
                <el-form label-width="120px">

                   <el-form-item label="用户名"> 
                        <el-input v-model="feedback.username"/>
                    </el-form-item> 

                    <el-form-item label="回复信息"> 
                        <el-input v-model="feedback.replyInfo" :rows="10" type="textarea"/>
                    </el-form-item>


                    <el-form-item>
                        <el-button :disabled="saveBtnDisabled" type="primary"
                            @click="reply">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </div>
</template>

<script>

import feedbackApi from '@/api/edu/feedback'

export default {
    data(){
        return{
            feedback:{
                id:''
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
            if (this.$route.params.id) {
            // 从路径获取id值
            const id = this.$route.params.id
            // 调用根据id查询的方法
            this.getInfo(id) 
            }
      
        },
        // 根据ID查询反馈信息
        getInfo(id){
            feedbackApi.findFeedBackInfo(id)
                .then(response =>{

                    this.feedback = response.data.feedback
                })
        },
        // 回复
        reply(){
            console.log(this.feedback)
            feedbackApi.replyFeedbackInfo(this.feedback)
            .then(response =>{//回复成功
                //提示信息
                this.$message({ 
                    type: 'success',
                    message: '回复成功!'
                });
                //回到列表页面  路由跳转
                this.$router.push({path:'/feedback/table'})
            })
        }
    }
}
</script>
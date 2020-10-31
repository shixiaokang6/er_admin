<template> 
    <div class="app-container">
        <h3>用户添加</h3>

        <template>
            <div class="app-container">
                <el-form label-width="120px">

                    <el-form-item label="用户名">
                        <el-input v-model="user.username"/>
                    </el-form-item>

                    <el-form-item label="手机号">
                        <el-input v-model="user.phoneNum"/>
                    </el-form-item>

                    <el-form-item label="联系地址">
                        <el-input v-model="user.address"/>
                    </el-form-item>
                    
                    <el-form-item label="年龄">
                        <el-input-number v-model="user.age" controls-position="right" min="0"/>
                    </el-form-item>
                    
                    <el-form-item label="性别">
                        <el-select v-model="user.gender" clearable placeholder="请选择">
                    <!--
                        数据类型一定要和取出的json中的一致，否则没法回填
                        因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
                            <el-option :value="0" label="男"/>
                            <el-option :value="1" label="女"/>
                        </el-select>

                    </el-form-item> 


                    <!-- <el-form-item label="认证状态">
                        <el-select v-model="teacher.sort" clearable placeholder="请选择">
       
                            <el-option :value="0" label="未认证"/>
                            <el-option :value="1" label="审核中"/>
                            <el-option :value="2" label="通过"/>
                        </el-select>

                    </el-form-item> -->
                    <el-form-item label="邮箱"> 
                        <el-input v-model="user.email"/>
                    </el-form-item> 


                    <el-form-item label="所在学校"> 
                        <el-input v-model="user.school"/>
                    </el-form-item> 

                
                    
                    <!-- 学生头像：TODO -->

                    
                    <!-- 学生头像 -->
                    <el-form-item label="学生头像">
                        <!-- 头衔缩略图 -->
                        <pan-thumb :image="user.headImg"/>
                        <!-- 文件上传按钮 -->
                        <el-button type="primary" icon="el-icon-upload"
                            @click="imagecropperShow=true">上传
                        </el-button>
                        
                        <!-- v-show：是否显示上传组件
                        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                        :url：后台上传的url地址
                        @close：关闭上传组件
                        @crop-upload-success：上传成功后的回调 
                        <input type="file" name="file"/> -->
                       
                        <image-cropper
                                v-show="imagecropperShow"
                                :width="100"
                                :height="100"
                                :key="imagecropperKey"
                                :url="BASE_API+'/eduoss/fileoss'"
                                field="file"
                                @close="close"
                                @crop-upload-success="cropSuccess"/>
                    </el-form-item>

                    <!-- <el-form-item label="头像">
                        
                        <el-upload
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :action="BASE_API+'/eduoss/fileoss'"
                            class="avatar-uploader">
                            <img :src="student.HeadImg">
                        </el-upload>              
                    </el-form-item>   -->




                    <el-form-item>
                        <el-button :disabled="saveBtnDisabled" type="primary"
                            @click="saveOrUpdate">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </div>
</template>

<script>

import studentApi from '@/api/edu/student'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: { ImageCropper, PanThumb },
    data(){
        return{
            user:{             
                erUser:{

                }
            },
            //上传弹框组件是否显示
            imagecropperShow:false,
            imagecropperKey:0,//上传组件key值
            BASE_API:process.env.BASE_API,//获取dev.env.js里面地址
            saveBtnDisabled:false//保存按钮是否禁用
        }
    },
    created(){//页面渲染之前执行
        this.init()
    },
    watch: {//监听
        $route(to, from) {//路由变化方式，路由发生变化，方法就会执行       
            this.init()
        }
    },
    methods:{
        
        // 关闭上传弹框的方法
        close(){
            this.imagecropperShow = false

            //上传组件初始化
            this.imagecropperKey = this.imagecropperKey + 1
        },
        //上传成功方法
        cropSuccess(data){
            this.imagecropperShow = false
            //上传之后接口返回图片地址
            this.user.headImg = data.url
            this.imagecropperKey = this.imagecropperKey + 1
        },
        init(){
            if (this.$route.params && this.$route.params.id) {
            // 从路径获取id值
            const id = this.$route.params.id
            // 调用根据id查询的方法
            this.getInfo(id) 
            }else{//路径没有id值，做添加
            // 清空表单
                this.user = {
                    
                }
            }
        },
        // 根据学生id查询的方法
        getInfo(id){
            studentApi.getStudentInfo(id)
                .then(response =>{
                    this.user = response.data.user
                })
        },
        saveOrUpdate(){
            // 判断修改还是添加
            // 根据user是否有id
            if(!this.user.id){
                //添加
                this.saveStudent()
            }else{
                //修改
                this.updateStudent()
            }
        },
        // 修改学生的方法
        updateStudent(){
            studentApi.updateStudentInfo(this.user)
                .then(response =>{
                    //提示信息
                    this.$message({ 
                        type: 'success',
                        message: '修改成功!'
                    });
                    //回到列表页面  路由跳转
                    this.$router.push({path:'/student/table'})
                })
        },
        // 添加学生的方法
        saveStudent(){
            studentApi.addStudent(this.user)
            .then(response =>{//添加成功
                //提示信息
                this.$message({ 
                    type: 'success',
                    message: '添加成功!'
                });
                //回到列表页面  路由跳转
                this.$router.push({path:'/student/table'})
            })
        }
    }
}
</script>
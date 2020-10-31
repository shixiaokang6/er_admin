<template> 
    <div class="app-container">
        教师添加

        <template>
            <div class="app-container">
                <el-form label-width="120px">
                    <el-form-item label="教师名称">
                        <el-input v-model="teacher.realName"/>
                    </el-form-item>
                    
                    <el-form-item label="用户编号">
                        <el-input-number v-model="teacher.uid" controls-position="right" min="0"/>
                    </el-form-item>
                    
                    <el-form-item label="认证类型">
                        <el-select v-model="teacher.sort" clearable placeholder="请选择">
                    <!--
                        数据类型一定要和取出的json中的一致，否则没法回填
                        因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
                            <el-option :value="0" label="老师"/>
                            <el-option :value="1" label="学生"/>
                            <el-option :value="2" label="大学生"/>
                        </el-select>

                    </el-form-item> 


                    <el-form-item label="认证状态">
                        <el-select v-model="teacher.sort" clearable placeholder="请选择">
                    <!--
                        数据类型一定要和取出的json中的一致，否则没法回填
                        因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
                            <el-option :value="0" label="未认证"/>
                            <el-option :value="1" label="审核中"/>
                            <el-option :value="2" label="通过"/>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="教师编号"> 
                        <el-input v-model="teacher.teacherId"/>
                    </el-form-item> 
                        <!-- <el-form-item label="讲师简介"> 
                            <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
                        </el-form-item> -->
                    <!-- 讲师头像：TODO -->

                    
                    <!-- 讲师头像 -->
                    <!-- <el-form-item label="教师资格证"> -->
                        <!-- 头衔缩略图 -->
                        <!-- <pan-thumb :image="teacher.img"/> -->
                        <!-- 文件上传按钮 -->
                        <!-- <el-button type="primary" icon="el-icon-upload"
                            @click="imagecropperShow=true">上传
                        </el-button> -->
                        
                        <!-- v-show：是否显示上传组件
                        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                        :url：后台上传的url地址
                        @close：关闭上传组件
                        @crop-upload-success：上传成功后的回调 
                        <input type="file" name="file"/> -->
                       
                        <!-- <image-cropper
                                v-show="imagecropperShow"
                                :width="300"
                                :height="300"
                                :key="imagecropperKey"
                                :url="BASE_API+'/eduoss/fileoss'"
                                field="file"
                                @close="close"
                                @crop-upload-success="cropSuccess"/> -->
                    <!-- </el-form-item> -->

                    <el-form-item label="教师资格证">
                        
                        <el-upload
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :action="BASE_API+'/eduoss/fileoss'"
                            class="avatar-uploader">
                            <img :src="teacher.img">
                        </el-upload>              
                    </el-form-item>  




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

import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: { ImageCropper, PanThumb },
    data(){
        return{
            teacher:{
                realName: '',
                uid: 0,
                sort: 0,
                statue: 0,
                certificationDate: '',
                img: '',
                teacherId:''
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
        // 上传之前调用的方法
        beforeAvatarUpload(file){

            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        // 上传封面成功调用的方法
        handleAvatarSuccess(res,file){
            this.teacher.img = res.data.url
        },
        // 关闭上传弹框的方法
        // close(){
        //     this.imagecropperShow = false

        //     //上传组件初始化
        //     this.imagecropperKey = this.imagecropperKey + 1
        // },
        //上传成功方法
        // cropSuccess(data){
        //     this.imagecropperShow = false
        //     //上传之后接口返回图片地址
        //     this.teacher.img = data.url
        //     this.imagecropperKey = this.imagecropperKey + 1
        // },
        init(){
            if (this.$route.params && this.$route.params.id) {
            // 从路径获取id值
            const id = this.$route.params.id
            // 调用根据id查询的方法
            this.getInfo(id) 
            }else{//路径没有id值，做添加
            // 清空表单
                this.teacher = {
                    realName: '',
                    uid: 0,
                    sort: 0,
                    statue: 0,
                    certificationDate: '',
                    img: '/static/001.jpg',
                    teacherId:''
                }
            }
        },
        // 根据讲师id查询的方法
        getInfo(id){
            teacherApi.getTeacherInfo(id)
                .then(response =>{
                    this.teacher = response.data.teacher
                })
        },
        saveOrUpdate(){
            // 判断修改还是添加
            // 根据teacher是否有id
            if(!this.teacher.id){
                //添加
                this.saveTeacher()
            }else{
                //修改
                this.updateTeacher()
            }
        },
        // 修改讲师的方法
        updateTeacher(){
            teacherApi.updateTeacherInfo(this.teacher)
                .then(response =>{
                    //提示信息
                    this.$message({ 
                        type: 'success',
                        message: '修改成功!'
                    });
                    //回到列表页面  路由跳转
                    this.$router.push({path:'/teacher/table'})
                })
        },
        // 添加讲师的方法
        saveTeacher(){
            teacherApi.addTeacher(this.teacher)
            .then(response =>{//添加成功
                //提示信息
                this.$message({ 
                    type: 'success',
                    message: '添加成功!'
                });
                //回到列表页面  路由跳转
                this.$router.push({path:'/teacher/table'})
            })
        }
    }
}
</script>
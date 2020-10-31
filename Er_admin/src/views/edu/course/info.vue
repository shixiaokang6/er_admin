<template> 
    <div class="app-container"> 
        <h2 style="text-align: center;">发布新课程</h2> 
            <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;"> 
                <el-step title="填写课程基本信息"/>
                <el-step title="创建课程大纲"/>
                <el-step title="最终发布"/>
            </el-steps> 
            

            <el-form label-width="120px">
                <el-form-item label="课程标题">
                    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目课程视频。专业名称注意大小写"></el-input>
                </el-form-item> 

                <el-form-item label="年级">
                    <el-input v-model="courseInfo.grade" placeholder="年级"></el-input>
                </el-form-item> 

                <el-form-item label="科目">
                    <el-input v-model="courseInfo.subject" placeholder="科目"></el-input>
                </el-form-item>

                    <!-- 教师头像 -->
                    <el-form-item label="教师头像">
                        <!-- 头衔缩略图 -->
                        <pan-thumb :image="courseInfo.thead"/>
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

                <el-form-item label="教师姓名">
                    <el-input v-model="courseInfo.teacherName" placeholder="教师姓名"></el-input>
                </el-form-item>

                <el-form-item label="教师自我介绍"> 
                    <el-input v-model="courseInfo.tinfo" :rows="10" type="textarea"/>
                </el-form-item>               

                <!-- 课程简介 TODO -->
                <!-- 课程简介-->
                <el-form-item label="课程简介"> 
                    <tinymce :height="300" v-model="courseInfo.description"/>
                </el-form-item>

                <!-- 课程封面 TODO -->
                <el-form-item label="课程封面">
                    <el-upload
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :action="BASE_API+'/eduoss/fileoss'"
                        class="avatar-uploader">
                        <img :src="courseInfo.cover">
                    </el-upload>              
                </el-form-item>  

                <el-form-item>
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
                </el-form-item>
            </el-form>
    </div>
</template> 
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'//引入组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'


export default {
    // 声明组件
    components: { ImageCropper,Tinymce,PanThumb },
    data() {
        return {
            saveBtnDisabled: false, // 保存按钮是否禁用
            courseInfo:{
                title: '',
                description: '',
                cover: '/static/01.jpg',
            },
            courseId:'',
            BASE_API: process.env.BASE_API, // 接口API地址
            //上传弹框组件是否显示
            imagecropperShow:false,
            imagecropperKey:0,//上传组件key值
            saveBtnDisabled:false//保存按钮是否禁用
        }
    },
    created() {
        this.init()
    },
    watch: {//监听
        $route(to, from) {//路由变化方式，路由发生变化，方法就会执行       
            this.init()
        }
    },   
    methods: {

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
            this.courseInfo.thead = data.url
            this.imagecropperKey = this.imagecropperKey + 1
        },
        init(){
            if(this.$route.params && this.$route.params.id){//修改操作
                this.courseId = this.$route.params.id
                //调用根据id查询课程的方法
                this.getInfo()
            }else{//添加操作
                // 表单数据清空
                this.courseInfo.title = ''
                this.courseInfo.description = ''
        }
        },
        //根据课程id查询
        getInfo(){
            course.getCourseInfoId(this.courseId)
                .then(response =>{
                    this.courseInfo = response.data.courseInfoVo
                        // 初始化所有讲师
                        this.getListTeacher()
                })
        },
        // 上传封面成功调用的方法
        handleAvatarSuccess(res,file){
            this.courseInfo.cover = res.data.url
        },
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
        saveOrUpdate() {
            if(!this.courseInfo.id){
                this.addCourse()
            }else{
                course.updateCourseInfo(this.courseInfo)
                .then(response =>{
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message:"修改课程信息成功"
                    })
                    // 跳转到第二步
                    this.$router.push({ path: '/course/chapter/' + this.courseId})
                })
            }
        },
        addCourse(){
            course.addCourseInfo(this.courseInfo)
                .then(response =>{
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message:"添加课程信息成功"
                    })
                    // 跳转到第二步
                    this.$router.push({ path: '/course/chapter/' + response.data.courseId})
                })
            }
        },
        // updateCourse(){
            
        // }
    }
</script>
 
<style scoped>
.tinymce-container {
line-height: 29px; }
</style>
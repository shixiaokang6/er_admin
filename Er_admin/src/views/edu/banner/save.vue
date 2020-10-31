<template> 
    <div class="app-container">
        <h3>轮播图添加</h3>

        <template>
            <div class="app-container">
                <el-form label-width="120px">
                    <el-form-item label="标题">
                        <el-input v-model="banner.title"/>
                    </el-form-item>
                    
                    <el-form-item label="轮播图">
                        
                        <el-upload
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :action="BASE_API+'/eduoss/fileoss'"
                            class="avatar-uploader">
                            <img :src="banner.imgUrl" width="200" height="200">
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

import bannerApi from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: { ImageCropper, PanThumb },
    data(){
        return{
            banner:{
                imgUrl:'/static/001.jpg'
            },
            
            //上传弹框组件是否显示
            // imagecropperShow:false,
            // imagecropperKey:0,//上传组件key值
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
            this.banner.imgUrl = res.data.url
        },

        init(){
            if (this.$route.params && this.$route.params.id) {
            // 从路径获取id值
            const id = this.$route.params.id
            // 调用根据id查询的方法
            this.getInfo(id) 
            }else{//路径没有id值，做添加
            // 清空表单
                this.banner = {
                    imgUrl:'/static/001.jpg'
                }
            }
        },
        // 根据讲师id查询的方法
        getInfo(id){
            bannerApi.getBannerInfo(id)
                .then(response =>{
                    this.banner = response.data.banner
                })
        },
        saveOrUpdate(){
            // 判断修改还是添加
            // 根据teacher是否有id
            if(!this.banner.id){
                //添加
                this.saveBanner()
            }else{
                //修改
                this.updateBanner()
            }
        },
        // 修改讲师的方法
        updateBanner(){
            bannerApi.updateBannerInfo(this.banner)
                .then(response =>{
                    //提示信息
                    this.$message({ 
                        type: 'success',
                        message: '修改成功!'
                    });
                    //回到列表页面  路由跳转
                    this.$router.push({path:'/banner/table'})
                })
        },
        // 添加讲师的方法
        saveBanner(){
            bannerApi.addBanner(this.banner)
            .then(response =>{//添加成功
                //提示信息
                this.$message({ 
                    type: 'success',
                    message: '添加成功!'
                });
                //回到列表页面  路由跳转
                this.$router.push({path:'/banner/table'})
            })
        }
    }
}
</script>
import request from '@/utils/request'


export default{
    //轮播图列表
    getBannerList(items){
        return request({
            // url: '/table/list'+current+"/"+limit,
            url: `/zhaojiajiaoservice/er-slideshow/findAllBanner`,
            method: 'post',
            // teacherQuery条件对象,后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面 
            data: items
          })
    },

    // 删除轮播图
    deleteBannerId(id){
        return request({
            url: `/zhaojiajiaoservice/er-slideshow/${id}`,
            method: 'delete'
        })
    },
    //添加轮播图
    addBanner(banner){
        console.log(banner)
        console.log(banner.title + "," + banner.imgUrl)
        return request({
            url: `/zhaojiajiaoservice/er-slideshow/insertBanner`,
            method: 'post',
            data: banner
        })
    },
    getBannerInfo(id){
        return request({
            url: `/zhaojiajiaoservice/er-slideshow/getBanner/${id}`,
            method: 'get'
        })
    },
    // 修改轮播图
    updateBannerInfo(banner){
        return request({
            url: `/zhaojiajiaoservice/er-slideshow/updateBanner`,
            method: 'post',
            data:banner
        })    
    }

}


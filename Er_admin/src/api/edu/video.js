import request from '@/utils/request'

export default{
    //添加小节
    addVideo(video){
        return request({
            url: `/zhaojiajiaoservice/er-video/addVideo`,
            method: 'post',
            data:video
        })
    },
    // //根据小节id查询小节
    getVideo(videoId){
        return request({
            url: `/zhaojiajiaoservice/er-video/getVideoInfo/${videoId}`,
            method: 'get'
        })
    },
    // //修改小节
    updateVideo(video){
        return request({
            url: `/zhaojiajiaoservice/er-video/updateVideo`,
            method: 'post',
            data:video
        })
    },
    // 删除小节
    deleteVideo(id){
        return request({
            url: `/zhaojiajiaoservice/er-video/${id}`,
            method: 'delete'
        })
    },
    // 删除视频
    deleteAliyunvod(id){
        return request({
            url: `/eduvod/video/removeAliVideo/${id}`,
            method: 'delete'
        })
    }
}
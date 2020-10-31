import request from '@/utils/request'


export default{
    //反馈列表（条件查询分页）
    // current当前页    limit每页记录数     teacherQuery条件对象
    getFeedBackListPage(curent,limit){
        return request({
            // url: '/table/list'+current+"/"+limit,
            url: `/zhaojiajiaoservice/er-feedback/findAllFeedback/${curent}/${limit}`,
            method: 'post',
            // teacherQuery条件对象,后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面 
          })
    },
    //根据ID查询反馈信息
    findFeedBackInfo(id){
        return request({
            url: `/zhaojiajiaoservice/er-feedback/findFeedbackById/${id}`,
            method: 'get'
        }) 
    },
    // 回复
    replyFeedbackInfo(feedback){
        return request({
            url: `/zhaojiajiaoservice/er-feedback/replyFeedback/${feedback.id}/${feedback.replyInfo}`,
            method: 'post'
        })    
    }

}


import request from '@/utils/request'


export default{
    //添加课程信息
    addCourseInfo(courseInfo){
        return request({
            url: `/zhaojiajiaoservice/er-course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    // 查询所有讲师
    getListTeacher(){
        return request({
            url: `/zhaojiajiaoservice/er-caf/findAll`,
            method: 'get'
        })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id){
        return request({
            url: `/zhaojiajiaoservice/er-course/getCourseInfo/${id}`,
            method: 'get'
        })
    },
    // 修改课程信息
    updateCourseInfo(courseInfo){
        return request({
            url: `/zhaojiajiaoservice/er-course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    // 课程确认信息显示
    getPublishCourseInfo(id){
        return request({
            url: `/zhaojiajiaoservice/er-course/getPublishCourseInfo/${id}`,
            method: 'get'
        })
    },
    // 课程最终发布
    publishCourse(id){
        return request({
            url: `/zhaojiajiaoservice/er-course/publishCourse/${id}`,
            method: 'post'
        })
    },
    // TODO 课程列表
    getListCourse(current,limit,courseQuery){
        return request({
            url: `/zhaojiajiaoservice/er-course/getCourseList/${current}/${limit}`,
            method: 'post',
            data:courseQuery
        }) 
    },
    // 删除课程
    deleteCourseId(id){
        return request({
            url: `/zhaojiajiaoservice/er-course/${id}`,
            method: 'delete'
        })
    },
}

